import { Module } from '@nestjs/common';
import { DijeteService } from './dijete.service';
import { DijeteController } from './dijete.controller';

@Module({
  controllers: [DijeteController],
  providers: [DijeteService]
})
export class DijeteModule {}
