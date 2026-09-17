import { Injectable } from '@nestjs/common';

import { IAppConfig } from './interface';
import { AppConfigurationRepository } from './app-configuration.repository';

@Injectable()
export class AppConfigurationService {
  constructor(private readonly repository: AppConfigurationRepository) { }

  findOne() {
    return this.repository.findOne({});
  }

  update(body: IAppConfig) {
    return this.repository.updateOne({}, body, { upsert: true });
  }
}
