import { Test, TestingModule } from '@nestjs/testing';
import { BolestService } from './bolest.service';

describe('BolestService', () => {
  let service: BolestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BolestService],
    }).compile();

    service = module.get<BolestService>(BolestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
