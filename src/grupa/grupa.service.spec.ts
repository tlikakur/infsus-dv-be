import { Test, TestingModule } from '@nestjs/testing';
import { GrupaService } from './grupa.service';

describe('GrupaService', () => {
  let service: GrupaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupaService],
    }).compile();

    service = module.get<GrupaService>(GrupaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
