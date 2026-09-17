import { Test, TestingModule } from '@nestjs/testing';
import { DeleteAccountRequestsController } from './delete-account-requests.controller';
import { DeleteAccountRequestsService } from './delete-account-requests.service';

describe('DeleteAccountRequestsController', () => {
  let controller: DeleteAccountRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeleteAccountRequestsController],
      providers: [DeleteAccountRequestsService],
    }).compile();

    controller = module.get<DeleteAccountRequestsController>(DeleteAccountRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
