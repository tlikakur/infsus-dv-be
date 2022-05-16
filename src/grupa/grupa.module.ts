import { Module } from '@nestjs/common';
import { GrupaService } from './grupa.service';
import { GrupaController } from './grupa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupa } from './entities/grupa.entity';
import { DijeteModule } from '../dijete/dijete.module';

@Module({
  controllers: [GrupaController],
  providers: [GrupaService, Grupa],
  imports: [TypeOrmModule.forFeature([Grupa]), DijeteModule],
  exports: [Grupa]
})
export class GrupaModule {}
