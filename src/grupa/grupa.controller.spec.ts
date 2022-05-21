import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dijete } from '../dijete/entities/dijete.entity';
import { DijeteService } from '../dijete/dijete.service';
import { Grupa } from './entities/grupa.entity';
import { GrupaController } from './grupa.controller';
import { GrupaService } from './grupa.service';

describe('GrupaController', () => {
  let controller: GrupaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupaController],
      providers: [
        GrupaService,
        DijeteService,
        {
          provide: getRepositoryToken(Grupa),
          useValue: {}
        },
        {
          provide: getRepositoryToken(Dijete),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<GrupaController>(GrupaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
