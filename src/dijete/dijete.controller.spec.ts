import { Test, TestingModule } from '@nestjs/testing';
import { DijeteController } from './dijete.controller';
import { DijeteService } from './dijete.service';

describe('DijeteController', () => {
  let controller: DijeteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DijeteController],
      providers: [DijeteService]
    }).compile();

    controller = module.get<DijeteController>(DijeteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
