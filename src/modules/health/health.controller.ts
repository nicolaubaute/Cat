import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private healthService: HealthService) {}

  /**
   * Add every dependency your service depends have to this endpoint.
   * This should include only dependencies your service need to start.
   * Examples:
   * - database connections (postgres, mongo Mysql)
   * - message brokers (rabbitMQ, kafka)
   * - external services (redis)
   *
   * Do not add dependencies to other services in the healthcheck
   * as this will prevent ALL traffic from being forwarded to the
   * service.
   */
  @Get()
  async healthcheck(): Promise<void> {
    await this.healthService.healthcheck();
  }
}
