import { Test, TestingModule } from '@nestjs/testing';
import { SchoolTypesController } from './school-types.controller';
import { SchoolTypesService } from './school-types.service';

describe('SchoolTypesController', () => {
  let controller: SchoolTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolTypesController],
      providers: [SchoolTypesService],
    }).compile();

    controller = module.get<SchoolTypesController>(SchoolTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
