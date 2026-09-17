import { Test, TestingModule } from '@nestjs/testing';
import { CtaEnquiryController } from './cta-enquiry.controller';
import { CtaEnquiryService } from './cta-enquiry.service';

describe('CtaEnquiryController', () => {
  let controller: CtaEnquiryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CtaEnquiryController],
      providers: [CtaEnquiryService],
    }).compile();

    controller = module.get<CtaEnquiryController>(CtaEnquiryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
