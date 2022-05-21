import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dijete } from '../dijete/entities/dijete.entity';
import { DijeteService } from '../dijete/dijete.service';
import { BolestController } from './bolest.controller';
import { BolestService } from './bolest.service';
import { Bolest } from './entities/bolest.entity';

describe('BolestController', () => {
  let controller: BolestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BolestController],
      providers: [
        BolestService,
        DijeteService,
        {
          provide: getRepositoryToken(Bolest),
          useValue: {}
        },
        {
          provide: getRepositoryToken(Dijete),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<BolestController>(BolestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
