// import axios, { AxiosInstance } from "axios";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@/src/config/env";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class SMSService {
    private logger = new Logger(SMSService.name);
    private client: AxiosInstance;
    private templateName: string;
    private templateLanguage: string;
    constructor(
        private config: ConfigService<EnvironmentVariables>
    ) {
        this.initSMSClient();
        this.logger.log('SMS service initialized');
    }

    private initSMSClient() {
        this.client = axios.create({
            baseURL: this.config.get<string>('WHATSAPP_ENDPOINT'),
            headers: {
                Authorization: `Bearer ${this.config.get<string>('WHATSAPP_TOKEN')}`,
            }
        });
        this.templateName = this.config.get<string>('WHATSAPP_TEMPLATE_NAME');
        this.templateLanguage = this.config.get<string>('WHATSAPP_TEMPLATE_LANGUAGE');
    }

    //send text sms to user
    async sendSms(mobile: string, otp: string) {
        const phone = parseInt("91" + mobile).toString();

        const body = {
            "messaging_product": "whatsapp",
            "to": phone,
            "type": "template",
            "template": {
                "name": this.templateName,
                "language": {
                    "code": this.templateLanguage
                },
                "components": [
                    {
                        "type": "body",
                        "parameters": [
                            {
                                "type": "text",
                                "text": otp
                            }
                        ]
                    },
                    {
                        "type": "button",
                        "sub_type": "url",
                        "index": 0,
                        "parameters": [
                            {
                                "type": "text",
                                "text": otp
                            }
                        ]
                    }
                ]
            }
        }

        try {
            const res = await this.client.post('', body);
            this.logger.log(res);
        } catch (error) {
            console.log(error)
            this.logger.error(error.data);
        }
    }
}