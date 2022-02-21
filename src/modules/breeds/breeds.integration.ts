import { HttpService } from '@nestjs/axios';
import { plainToClass } from '@nestjs/class-transformer';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import appEnv from '../main/app.env';
import { BreedDto } from './dtos/cat.dto';
import { ImageDto } from './dtos/image.dto';

@Injectable()
export class BreedsIntegration {
  private static readonly base = appEnv.CATS_URL;

  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly httpService: HttpService) {}

  async getCatBreedsFromAPI(): Promise<BreedDto[]> {
    const url = `${BreedsIntegration.base}/breeds`;

    const observable = this.httpService.get<BreedDto[]>(url);

    const value = await firstValueFrom(observable);

    return plainToClass(BreedDto, value.data);
  }

  async getImagesOfBreedFromAPI(breedId: string): Promise<ImageDto[]> {
    const url = `${BreedsIntegration.base}/images/search`;

    const imageQuery = { breed_id: breedId, limit: 3 };

    const config = { params: imageQuery };

    const observable = this.httpService.get<ImageDto[]>(url, config);

    const value = await firstValueFrom(observable);

    return plainToClass(ImageDto, value.data);
  }
}
