import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class BreedDto {
  @Expose()
  id: string;

  @Expose()
  description: string;

  @Expose()
  name: string;

  @Expose()
  origin: string;

  @Expose()
  temperament: string;
}
