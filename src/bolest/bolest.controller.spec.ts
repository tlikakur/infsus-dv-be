import { Test, TestingModule } from '@nestjs/testing';
import { BolestController } from './bolest.controller';
import { BolestService } from './bolest.service';

describe('BolestController', () => {
  let controller: BolestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BolestController],
      providers: [BolestService],
    }).compile();

    controller = module.get<BolestController>(BolestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
