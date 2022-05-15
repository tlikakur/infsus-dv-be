import { Module } from '@nestjs/common';
import { BolestService } from './bolest.service';
import { BolestController } from './bolest.controller';

@Module({
  controllers: [BolestController],
  providers: [BolestService]
})
export class BolestModule {}
