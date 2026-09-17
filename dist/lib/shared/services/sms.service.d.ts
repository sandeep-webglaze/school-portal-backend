import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@/src/config/env";
export declare class SMSService {
    private config;
    private logger;
    private client;
    private templateName;
    private templateLanguage;
    constructor(config: ConfigService<EnvironmentVariables>);
    private initSMSClient;
    sendSms(mobile: string, otp: string): Promise<void>;
}
