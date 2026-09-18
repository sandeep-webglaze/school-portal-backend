import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '@/src/config/env';
import { IMail } from './interface';
export declare class MailService {
    readonly config: ConfigService<EnvironmentVariables>;
    private logger;
    private transporter;
    private supportMail;
    private supportMailPass;
    constructor(config: ConfigService<EnvironmentVariables>);
    private verifyTransport;
    private initTransport;
    addEmailJob(job: IMail): void;
    sendMail(options: IMail): Promise<boolean>;
}
