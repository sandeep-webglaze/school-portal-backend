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
var RazorPayService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RazorPayService = void 0;
const Razorpay = require("razorpay");
const razorpay_utils_1 = require("razorpay/dist/utils/razorpay-utils");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let RazorPayService = RazorPayService_1 = class RazorPayService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(RazorPayService_1.name);
        console.log(`Razorpay Credentials:key:${configService.get('RAZORPAY_KEY_ID')}value:${configService.get('RAZORPAY_KEY_SECRET')}`);
        this.razorpay = new Razorpay({
            key_id: configService.get('RAZORPAY_KEY_ID'),
            key_secret: configService.get('RAZORPAY_KEY_SECRET')
        });
    }
    validatePaymentRequest(req) {
        try {
            const body = req.body;
            const signature = req.get("x-razorpay-signature");
            const secret = this.configService.get('RAZORPAY_WEBHOOK_SECRET');
            console.log("bef verify==>", body, signature, this.configService.get('RAZORPAY_WEBHOOK_SECRET'));
            const isValidRequest = (0, razorpay_utils_1.validateWebhookSignature)(JSON.stringify(body ?? {}), signature, this.configService.get('RAZORPAY_WEBHOOK_SECRET'));
            this.logger.log(`payment body:${JSON.stringify(body, null, 2)}`);
            this.logger.log(`payment body is validated: ${isValidRequest}`);
            let newBody = JSON.stringify(body);
            newBody = newBody.toString();
            var expectedSignature = crypto.createHmac('sha256', secret).update(newBody).digest('hex');
            console.log(`expectedSignature => ${expectedSignature} orgSignature ==> ${signature}`);
            console.log('isSignatureMatched==>', expectedSignature == signature);
            if (!isValidRequest)
                throw new common_1.ForbiddenException("Invalid Request");
            const event = body.event;
            switch (event) {
                case "order.paid":
                    const orderId = body.payload.order.entity.id;
                    const amount = this.getOriginalAmount(body.payload.order.entity.amount_paid);
                    return { orderId: orderId, amount, success: true };
                case "payment.failed":
                    const { order_id } = body.payload.payment?.entity ?? {};
                    return { orderId: order_id, success: false };
            }
        }
        catch (error) {
            console.log(`error in razorpay verify==>${error}`);
        }
    }
    async createOrder(amount, currency = "INR") {
        const options = {
            amount: Number(amount * 100),
            currency,
        };
        return await this.razorpay.orders.create(options);
    }
    getOriginalAmount(amount) {
        return amount / 100;
    }
};
exports.RazorPayService = RazorPayService;
exports.RazorPayService = RazorPayService = RazorPayService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RazorPayService);
//# sourceMappingURL=razorpay.service.js.map