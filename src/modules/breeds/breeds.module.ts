import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BreedsController } from './breeds.controller';
import { BreedsIntegration } from './breeds.integration';
import { BreedsRepository } from './breeds.repository';
import { BreedsService } from './breeds.service';

@Module({
  controllers: [BreedsController],
  imports: [HttpModule],
  providers: [BreedsService, BreedsIntegration, BreedsRepository],
})
export class BreedsModule {}
