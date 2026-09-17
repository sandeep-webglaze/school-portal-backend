import { Test, TestingModule } from '@nestjs/testing';
import { SlugController } from './slug.controller';
import { SlugService } from './slug.service';

describe('SlugController', () => {
  let controller: SlugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SlugController],
      providers: [SlugService],
    }).compile();

    controller = module.get<SlugController>(SlugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
