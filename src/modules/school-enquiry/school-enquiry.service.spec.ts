import { Test, TestingModule } from '@nestjs/testing';
import { SchoolEnquiryService } from './school-enquiry.service';

describe('SchoolEnquiryService', () => {
  let service: SchoolEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolEnquiryService],
    }).compile();

    service = module.get<SchoolEnquiryService>(SchoolEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
