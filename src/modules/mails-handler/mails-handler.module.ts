import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { MailsProcessor } from './mails.processor';
import { MailService } from './mail.service';
import { MailEvents } from './events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'EmailDispatchQueue',
    }),
    BullModule.registerFlowProducer({
      name: 'EmailDispatchFlowProducer',
    })
  ],
  providers: [
    MailService,
    MailsProcessor,
    MailEvents
  ],
  exports: [
    MailEvents
  ]
})
export class MailsHandlerModule { }
