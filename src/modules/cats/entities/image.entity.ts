import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class ImageEntity {
  @Expose()
  id: string;

  @Expose()
  url: string;

  @Expose()
  breed_id: string;
}
