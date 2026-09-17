import { Test, TestingModule } from '@nestjs/testing';
import { CtaEnquiryService } from './cta-enquiry.service';

describe('CtaEnquiryService', () => {
  let service: CtaEnquiryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CtaEnquiryService],
    }).compile();

    service = module.get<CtaEnquiryService>(CtaEnquiryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
