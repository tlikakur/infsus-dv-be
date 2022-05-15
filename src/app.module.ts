import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrupaModule } from './grupa/grupa.module';
import { DijeteModule } from './dijete/dijete.module';
import { BolestModule } from './bolest/bolest.module';

@Module({
  imports: [GrupaModule, DijeteModule, BolestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
