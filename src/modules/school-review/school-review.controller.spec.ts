import { Test, TestingModule } from '@nestjs/testing';
import { SchoolReviewController } from './school-review.controller';
import { SchoolReviewService } from './school-review.service';

describe('SchoolReviewController', () => {
  let controller: SchoolReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolReviewController],
      providers: [SchoolReviewService],
    }).compile();

    controller = module.get<SchoolReviewController>(SchoolReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
