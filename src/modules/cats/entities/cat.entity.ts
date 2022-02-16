import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class CatEntity {
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
