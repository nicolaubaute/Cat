import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsIntegration } from './cats.integration';
import { CatsRepository } from './cats.repository';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  imports: [HttpModule],
  providers: [CatsService, CatsIntegration, CatsRepository],
})
export class CatsModule {}
