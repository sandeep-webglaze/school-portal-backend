import { Test, TestingModule } from '@nestjs/testing';
import { ClaimSchoolEnquiryService } from './claim-school-enquiry.service';

describe('ClaimSchoolEnquiryService', () => {
  let service: ClaimSchoolEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaimSchoolEnquiryService],
    }).compile();

    service = module.get<ClaimSchoolEnquiryService>(ClaimSchoolEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
