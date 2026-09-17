import { Test, TestingModule } from '@nestjs/testing';
import { SchoolReviewService } from './school-review.service';

describe('SchoolReviewService', () => {
  let service: SchoolReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolReviewService],
    }).compile();

    service = module.get<SchoolReviewService>(SchoolReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
