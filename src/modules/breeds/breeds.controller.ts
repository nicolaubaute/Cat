import { TransformPlainToClass } from '@nestjs/class-transformer';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BreedsService } from './breeds.service';
import { BreedDto } from './dtos/cat.dto';
import { CatFilterSchema } from './schemas/cat-filter.schema';
import { BreedIdSchema } from './schemas/cat-id.schema';

@Controller('breeds')
export class BreedsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly breedsService: BreedsService) {}

  @Get(':name')
  @TransformPlainToClass(BreedDto)
  async findOne(@Param() idSchema: BreedIdSchema): Promise<BreedDto> {
    return this.breedsService.findOne(idSchema.name);
  }

  @Get()
  @TransformPlainToClass(BreedDto)
  async find(@Query() filter: CatFilterSchema): Promise<BreedDto[]> {
    return this.breedsService.find(filter);
  }

  @Post()
  async feedCatBreedsFromAPI(): Promise<void> {
    return this.breedsService.feedCatBreedsFromAPI();
  }
}
