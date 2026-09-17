import { Test, TestingModule } from '@nestjs/testing';
import { ClaimSchoolEnquiryController } from './claim-school-enquiry.controller';
import { ClaimSchoolEnquiryService } from './claim-school-enquiry.service';

describe('ClaimSchoolEnquiryController', () => {
  let controller: ClaimSchoolEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaimSchoolEnquiryController],
      providers: [ClaimSchoolEnquiryService],
    }).compile();

    controller = module.get<ClaimSchoolEnquiryController>(ClaimSchoolEnquiryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
