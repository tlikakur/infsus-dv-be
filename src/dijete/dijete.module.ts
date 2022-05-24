import { forwardRef, Module } from '@nestjs/common';
import { DijeteService } from './dijete.service';
import { DijeteController } from './dijete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dijete } from './entities/dijete.entity';
import { BolestModule } from '../bolest/bolest.module';

@Module({
  controllers: [DijeteController],
  providers: [DijeteService, Dijete],
  imports: [TypeOrmModule.forFeature([Dijete]), forwardRef(() => BolestModule)],
  exports: [Dijete, DijeteService]
})
export class DijeteModule {}
