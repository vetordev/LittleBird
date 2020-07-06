import { Test, TestingModule } from '@nestjs/testing';
import { InterestService } from './interest.service';

describe('InterestService', () => {
  let service: InterestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterestService],
    }).compile();

    service = module.get<InterestService>(InterestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
