import { Exclude, Expose } from '@nestjs/class-transformer';

@Exclude()
export class BreedIdSchema {
  @Expose()
  name: string;
}
