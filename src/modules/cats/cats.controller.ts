import { TransformPlainToClass } from '@nestjs/class-transformer';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatDto } from './dtos/cat.dto';
import { CatFilterSchema } from './schemas/cat-filter.schema';
import { CatIdSchema } from './schemas/cat-id.schema';

@Controller('breeds')
export class CatsController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly catsService: CatsService) {}

  @Get(':name')
  @TransformPlainToClass(CatDto)
  findOne(@Param() idSchema: CatIdSchema): Promise<CatDto> {
    return this.catsService.findOne(idSchema.name);
  }

  @Get()
  @TransformPlainToClass(CatDto)
  find(@Query() filter: CatFilterSchema): Promise<CatDto[]> {
    return this.catsService.find(filter);
  }

  @Post()
  async feedCatBreedsFromAPI(): Promise<void> {
    return this.catsService.feedCatBreedsFromAPI();
  }
}
