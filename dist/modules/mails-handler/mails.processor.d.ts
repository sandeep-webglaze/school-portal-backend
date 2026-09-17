import { Job } from 'bullmq';
import { WorkerHost } from '@nestjs/bullmq';
import { IMail } from './interface';
import { MailService } from './mail.service';
export declare class MailsProcessor extends WorkerHost {
    private readonly mailService;
    constructor(mailService: MailService);
    process(job: Job<IMail, any, string>): Promise<any>;
}
