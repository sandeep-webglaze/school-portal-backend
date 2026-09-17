"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsHandlerModule = void 0;
const common_1 = require("@nestjs/common");
const bullmq_1 = require("@nestjs/bullmq");
const mails_processor_1 = require("./mails.processor");
const mail_service_1 = require("./mail.service");
const events_1 = require("./events");
let MailsHandlerModule = class MailsHandlerModule {
};
exports.MailsHandlerModule = MailsHandlerModule;
exports.MailsHandlerModule = MailsHandlerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bullmq_1.BullModule.registerQueue({
                name: 'EmailDispatchQueue',
            }),
            bullmq_1.BullModule.registerFlowProducer({
                name: 'EmailDispatchFlowProducer',
            })
        ],
        providers: [
            mail_service_1.MailService,
            mails_processor_1.MailsProcessor,
            events_1.MailEvents
        ],
        exports: [
            events_1.MailEvents
        ]
    })
], MailsHandlerModule);
//# sourceMappingURL=mails-handler.module.js.map