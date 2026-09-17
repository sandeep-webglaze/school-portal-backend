import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAccountRequestsService } from './delete-account-requests.service';

describe('DeleteAccountRequestsService', () => {
  let service: DeleteAccountRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteAccountRequestsService],
    }).compile();

    service = module.get<DeleteAccountRequestsService>(DeleteAccountRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
