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
var SMSService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SMSService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("axios");
let SMSService = SMSService_1 = class SMSService {
    constructor(config) {
        this.config = config;
        this.logger = new common_1.Logger(SMSService_1.name);
        this.initSMSClient();
        this.logger.log('SMS service initialized');
    }
    initSMSClient() {
        this.client = axios_1.default.create({
            baseURL: this.config.get('WHATSAPP_ENDPOINT'),
            headers: {
                Authorization: `Bearer ${this.config.get('WHATSAPP_TOKEN')}`,
            }
        });
        this.templateName = this.config.get('WHATSAPP_TEMPLATE_NAME');
        this.templateLanguage = this.config.get('WHATSAPP_TEMPLATE_LANGUAGE');
    }
    async sendSms(mobile, otp) {
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
        };
        try {
            const res = await this.client.post('', body);
            this.logger.log(res);
        }
        catch (error) {
            console.log(error);
            this.logger.error(error.data);
        }
    }
};
exports.SMSService = SMSService;
exports.SMSService = SMSService = SMSService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SMSService);
//# sourceMappingURL=sms.service.js.map