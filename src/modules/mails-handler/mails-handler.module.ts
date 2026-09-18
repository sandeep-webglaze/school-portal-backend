import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { MailEvents } from './events';

// Redis-free: no Bull queue/processor. Mail is sent directly by MailService.
@Module({
  providers: [MailService, MailEvents],
  exports: [MailEvents],
})
export class MailsHandlerModule {}
