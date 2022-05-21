import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DijeteController } from './dijete.controller';
import { DijeteService } from './dijete.service';
import { Dijete } from './entities/dijete.entity';

describe('DijeteController', () => {
  let controller: DijeteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DijeteController],
      providers: [
        DijeteService,
        {
          provide: getRepositoryToken(Dijete),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<DijeteController>(DijeteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
