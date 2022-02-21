import { Injectable } from '@nestjs/common';
import { BreedsIntegration } from './breeds.integration';
import { BreedsRepository } from './breeds.repository';
import { ImageDto } from './dtos/image.dto';
import { BreedEntity } from './entities/breed.entity';
import { BreedFilterType } from './types/breed-filter.type';

@Injectable()
export class BreedsService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly breedsIntegration: BreedsIntegration,
    private readonly breedsRepository: BreedsRepository,
  ) {}

  async find(filter: BreedFilterType): Promise<BreedEntity[]> {
    return this.breedsRepository.find(filter);
  }

  async findOne(name: string): Promise<BreedEntity> {
    return this.breedsRepository.findOne(name);
  }

  async feedCatBreedsFromAPI(): Promise<void> {
    const catBreedsFromAPI = await this.breedsIntegration.getCatBreedsFromAPI();

    await this.breedsRepository.deleteAll();

    await this.breedsRepository.save(catBreedsFromAPI);

    const images: ImageDto[] = [];

    const imagesPromises = catBreedsFromAPI.map(async (breed) => {
      const breedId = breed.id;

      const innerImages = await this.breedsIntegration.getImagesOfBreedFromAPI(
        breedId,
      );

      innerImages.forEach((element) => {
        const image = { ...element, breed_id: breedId };

        images.push(image);
      });
    });

    await Promise.all(imagesPromises);

    await this.breedsRepository.saveImages(images);
  }
}
