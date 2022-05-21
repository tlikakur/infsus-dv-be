import { Test, TestingModule } from '@nestjs/testing';
import { DijeteService } from './dijete.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dijete } from './entities/dijete.entity';

describe('DijeteService', () => {
  let service: DijeteService;
  let repository: Repository<Dijete>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DijeteService,
        {
          provide: getRepositoryToken(Dijete),
          useValue: {}
        }
      ]
    }).compile();

    service = module.get<DijeteService>(DijeteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
