import { Module } from '@nestjs/common';
import { DijeteService } from './dijete.service';
import { DijeteController } from './dijete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dijete } from './entities/dijete.entity';
import { Grupa } from '../grupa/entities/grupa.entity';

@Module({
  controllers: [DijeteController],
  providers: [DijeteService, Dijete],
  imports: [Grupa, TypeOrmModule.forFeature([Dijete])],
  exports: [Dijete, DijeteService]
})
export class DijeteModule {}
