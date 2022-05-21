import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Dijete } from '../dijete/entities/dijete.entity';
import { Repository } from 'typeorm';
import { BolestService } from './bolest.service';
import { Bolest } from './entities/bolest.entity';
import { DijeteService } from '../dijete/dijete.service';

describe('BolestService', () => {
  let service: BolestService;
  let repository: Repository<Bolest>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<BolestService>(BolestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
