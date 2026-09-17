"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer = require("nodemailer");
const bullmq_1 = require("@nestjs/bullmq");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const bullmq_2 = require("bullmq");
let MailService = MailService_1 = class MailService {
    constructor(config, emailQueue) {
        this.config = config;
        this.emailQueue = emailQueue;
        this.logger = new common_1.Logger(MailService_1.name);
        this.supportMail = this.config.get('EDHIPPO_SUPPORT_MAIL');
        this.supportMailPass = this.config.get('EDHIPPO_SUPPORT_MAIL_PASSWORD');
        this.initTransport();
    }
    async verifyTransport() {
        return await this.transporter.verify();
    }
    initTransport() {
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
    addEmailJob(job) {
        console.log("adding mail job ...", new Date());
        this.emailQueue.add('email', job);
    }
    async sendMail(options) {
        console.log("sending mail...", new Date());
        try {
            await this.transporter.sendMail({
                ...options,
                from: this.supportMail,
            });
            return true;
        }
        catch (error) {
            this.logger.error('Error while sending mail', error);
            console.log("error:", error);
            return false;
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, bullmq_1.InjectQueue)('EmailDispatchQueue')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        bullmq_2.Queue])
], MailService);
//# sourceMappingURL=mail.service.js.map