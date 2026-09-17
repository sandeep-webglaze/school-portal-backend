import { Test, TestingModule } from '@nestjs/testing';
import { FavoriteSchoolController } from './favorite-school.controller';
import { FavoriteSchoolService } from './favorite-school.service';

describe('FavoriteSchoolController', () => {
  let controller: FavoriteSchoolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoriteSchoolController],
      providers: [FavoriteSchoolService],
    }).compile();

    controller = module.get<FavoriteSchoolController>(FavoriteSchoolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
