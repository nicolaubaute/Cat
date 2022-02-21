import { Exclude, Expose } from '@nestjs/class-transformer';
import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';

@Exclude()
export class CatFilterSchema {
  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  origin?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  temperament?: string;
}
