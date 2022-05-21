import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dijete } from '../dijete/entities/dijete.entity';
import { DijeteService } from '../dijete/dijete.service';
import { Grupa } from './entities/grupa.entity';
import { GrupaService } from './grupa.service';

describe('GrupaService', () => {
  let service: GrupaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<GrupaService>(GrupaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
