import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteSchoolService } from './favorite-school.service';

describe('FavoriteSchoolService', () => {
  let service: FavoriteSchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoriteSchoolService],
    }).compile();

    service = module.get<FavoriteSchoolService>(FavoriteSchoolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
