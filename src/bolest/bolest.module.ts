import { forwardRef, Module } from '@nestjs/common';
import { BolestService } from './bolest.service';
import { BolestController } from './bolest.controller';
import { DijeteModule } from '../dijete/dijete.module';
import { Bolest } from './entities/bolest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BolestController],
  providers: [BolestService, Bolest],
  imports: [forwardRef(() => DijeteModule), TypeOrmModule.forFeature([Bolest])],
  exports: [Bolest, BolestService]
})
export class BolestModule {}
