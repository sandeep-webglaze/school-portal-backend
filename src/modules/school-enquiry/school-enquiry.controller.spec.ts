import { Test, TestingModule } from '@nestjs/testing';
import { SchoolEnquiryController } from './school-enquiry.controller';
import { SchoolEnquiryService } from './school-enquiry.service';

describe('SchoolEnquiryController', () => {
  let controller: SchoolEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolEnquiryController],
      providers: [SchoolEnquiryService],
    }).compile();

    controller = module.get<SchoolEnquiryController>(SchoolEnquiryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
