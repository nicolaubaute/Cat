import { HttpService } from '@nestjs/axios';
import { plainToClass } from '@nestjs/class-transformer';
import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'winston';
import appEnv from '../main/app.env';
import { CatDto } from './dtos/cat.dto';
import { ImageDto } from './dtos/image.dto';

@Injectable()
export class CatsIntegration {
  private static readonly base = appEnv.CATS_URL;

  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly httpService: HttpService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getCatBreedsFromAPI(): Promise<CatDto[]> {
    const url = `${CatsIntegration.base}/breeds`;

    const observable = this.httpService.get<CatDto[]>(url);

    const value = await firstValueFrom(observable);

    return plainToClass(CatDto, value.data);
  }

  async getImagesOfBreedFromAPI(breedId: string): Promise<ImageDto[]> {
    const url = `${CatsIntegration.base}/images/search`;

    const imageQuery = { breed_id: breedId, limit: 3 };

    const config = { params: imageQuery };

    const observable = this.httpService.get<ImageDto[]>(url, config);

    const value = await firstValueFrom(observable);

    return plainToClass(ImageDto, value.data);
  }
}
