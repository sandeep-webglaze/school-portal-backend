import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigurationController } from './app-configuration.controller';
import { AppConfigurationService } from './app-configuration.service';

describe('AppConfigurationController', () => {
  let controller: AppConfigurationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppConfigurationController],
      providers: [AppConfigurationService],
    }).compile();

    controller = module.get<AppConfigurationController>(AppConfigurationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
