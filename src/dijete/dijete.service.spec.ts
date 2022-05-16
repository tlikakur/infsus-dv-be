import { Test, TestingModule } from '@nestjs/testing';
import { DijeteService } from './dijete.service';

describe('DijeteService', () => {
  let service: DijeteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DijeteService]
    }).compile();

    service = module.get<DijeteService>(DijeteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
