import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class CatIdSchema {
  @Expose()
  name: string;
}
