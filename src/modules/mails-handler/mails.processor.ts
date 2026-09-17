import { Job } from 'bullmq';
import { Processor, WorkerHost } from '@nestjs/bullmq';

import { IMail } from './interface';
import { MailService } from './mail.service';

@Processor('EmailDispatchQueue')
export class MailsProcessor extends WorkerHost {
    constructor(
        private readonly mailService: MailService
    ) {
        super()
    }

    async process(job: Job<IMail, any, string>): Promise<any> {
        const success = await this.mailService.sendMail(job.data);
        return { jobId: job.id, success }
    }
}
