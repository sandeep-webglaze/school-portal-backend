import * as nodemailer from 'nodemailer';
import { InjectQueue } from '@nestjs/bullmq';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';

import { EnvironmentVariables } from '@/src/config/env';
import { IMail } from './interface';
import { Queue } from 'bullmq';

@Injectable()
export class MailService {
    private logger = new Logger(MailService.name);
    private transporter: nodemailer.Transporter;
    private supportMail: string;
    private supportMailPass: string;

    constructor(
        readonly config: ConfigService<EnvironmentVariables>,
        @InjectQueue('EmailDispatchQueue') private emailQueue: Queue,
    ) {
        this.supportMail = this.config.get('EDHIPPO_SUPPORT_MAIL')
        this.supportMailPass = this.config.get('EDHIPPO_SUPPORT_MAIL_PASSWORD')
        this.initTransport();
    }

    private async verifyTransport() {
        return await this.transporter.verify()
    }

    private initTransport() {
        this.transporter = nodemailer.createTransport({
            host: this.config.get('EDHIPPO_HOST'),
            secure: true,
            tls: {
                ciphers: 'SSLv3'
            },
            requireTLS: true,
            port: this.config.get('EDHIPPO_PORT'),
            debug: true,
            auth: {
                user: this.supportMail,
                pass: this.supportMailPass
            }
        });
    }

    addEmailJob(job: IMail) {
        console.log("adding mail job ...", new Date());

        this.emailQueue.add('email', job);
    }

    async sendMail(options: IMail) {
        console.log("sending mail...", new Date());

        try {
            await this.transporter.sendMail({
                ...options,
                from: this.supportMail,
            })
            return true;
        } catch (error) {
            this.logger.error('Error while sending mail', error);
            console.log("error:", error)
            return false;
        }
    }
}
