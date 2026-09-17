import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
import { IMail } from './interface';
import { Queue } from 'bullmq';
export declare class MailService {
    readonly config: ConfigService<EnvironmentVariables>;
    private emailQueue;
    private logger;
    private transporter;
    private supportMail;
    private supportMailPass;
    constructor(config: ConfigService<EnvironmentVariables>, emailQueue: Queue);
    private verifyTransport;
    private initTransport;
    addEmailJob(job: IMail): void;
    sendMail(options: IMail): Promise<boolean>;
}
