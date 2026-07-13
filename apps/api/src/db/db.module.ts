import { Global, Logger, Module, OnModuleInit } from '@nestjs/common';
import { DbService } from './db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule implements OnModuleInit {
  private readonly logger = new Logger(DbModule.name);

  constructor(private readonly dbService: DbService) {}

  async onModuleInit(): Promise<void> {
    await this.dbService.ping();
    this.logger.log('Connexion PostgreSQL OK');
  }
}
