import { Module } from '@nestjs/common';
import { GrupaService } from './grupa.service';
import { GrupaController } from './grupa.controller';

@Module({
  controllers: [GrupaController],
  providers: [GrupaService]
})
export class GrupaModule {}
