import { Module } from '@nestjs/common';
import { DijeteService } from './dijete.service';
import { DijeteController } from './dijete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dijete } from './entities/dijete.entity';

@Module({
  controllers: [DijeteController],
  providers: [DijeteService],
  imports: [TypeOrmModule.forFeature([Dijete])],
})
export class DijeteModule {}
