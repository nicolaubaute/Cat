import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { CatsIntegration } from './cats.integration';
import { CatsRepository } from './cats.repository';
import { ImageDto } from './dtos/image.dto';
import { CatEntity } from './entities/cat.entity';
import { CatFilterType } from './types/cat-filter.type';

@Injectable()
export class CatsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly catsIntegration: CatsIntegration,
    private readonly catsRepository: CatsRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async find(filter: CatFilterType): Promise<CatEntity[]> {
    return this.catsRepository.find(filter);
  }

  async findOne(name: string): Promise<CatEntity> {
    return this.catsRepository.findOne(name);
  }

  async feedCatBreedsFromAPI(): Promise<void> {
    const catBreedsFromAPI = await this.catsIntegration.getCatBreedsFromAPI();

    await this.catsRepository.deleteAll();

    await this.catsRepository.save(catBreedsFromAPI);

    const images: ImageDto[] = [];

    const imagesPromises = catBreedsFromAPI.map(async (breed) => {
      const breedId = breed.id;

      const innerImages = await this.catsIntegration.getImagesOfBreedFromAPI(
        breedId,
      );

      innerImages.forEach((element) => {
        const image = { ...element, breed_id: breedId };

        images.push(image);
      });
    });

    await Promise.all(imagesPromises);

    await this.catsRepository.saveImages(images);
  }
}
