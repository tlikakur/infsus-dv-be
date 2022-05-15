import { Test, TestingModule } from '@nestjs/testing';
import { GrupaController } from './grupa.controller';
import { GrupaService } from './grupa.service';

describe('GrupaController', () => {
  let controller: GrupaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupaController],
      providers: [GrupaService]
    }).compile();

    controller = module.get<GrupaController>(GrupaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
