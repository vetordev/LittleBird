import { Test, TestingModule } from '@nestjs/testing';
import { InterestController } from './interest.controller';

describe('Interest Controller', () => {
  let controller: InterestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterestController],
    }).compile();

    controller = module.get<InterestController>(InterestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
