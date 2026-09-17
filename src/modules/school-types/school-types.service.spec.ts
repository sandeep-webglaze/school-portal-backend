import { Test, TestingModule } from '@nestjs/testing';
import { SchoolTypesService } from './school-types.service';

describe('SchoolTypesService', () => {
  let service: SchoolTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolTypesService],
    }).compile();

    service = module.get<SchoolTypesService>(SchoolTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
