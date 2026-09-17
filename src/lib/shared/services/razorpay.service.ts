import { Request } from "express";
import Razorpay = require("razorpay");
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";
import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as  crypto from 'crypto';


import { EnvironmentVariables } from "@/src/config/env";

@Injectable()
export class RazorPayService {
    private logger = new Logger(RazorPayService.name);
    private razorpay: Razorpay

    constructor(private configService: ConfigService<EnvironmentVariables>) {
        console.log(`Razorpay Credentials:key:${configService.get('RAZORPAY_KEY_ID')}value:${configService.get('RAZORPAY_KEY_SECRET')}`);
        this.razorpay = new Razorpay({
            key_id: configService.get('RAZORPAY_KEY_ID'),
            key_secret: configService.get('RAZORPAY_KEY_SECRET')
        });
    }



    validatePaymentRequest(req: Request) {
        try {

            const body = req.body;
            const signature = req.get("x-razorpay-signature");
            const secret = this.configService.get('RAZORPAY_WEBHOOK_SECRET');
            console.log("bef verify==>", body, signature, this.configService.get('RAZORPAY_WEBHOOK_SECRET'))

            const isValidRequest = validateWebhookSignature(JSON.stringify(body ?? {}), signature, this.configService.get('RAZORPAY_WEBHOOK_SECRET'));


            this.logger.log(`payment body:${JSON.stringify(body, null, 2)}`);

            this.logger.log(`payment body is validated: ${isValidRequest}`);

            // custom verification 
            let newBody = JSON.stringify(body);
            newBody = newBody.toString()
            var expectedSignature = crypto.createHmac('sha256', secret).update(newBody).digest('hex');

            console.log(`expectedSignature => ${expectedSignature} orgSignature ==> ${signature}`);
            console.log('isSignatureMatched==>', expectedSignature == signature);

            if (!isValidRequest) throw new ForbiddenException("Invalid Request");


            const event = body.event;

            switch (event) {
                case "order.paid":
                    const orderId = body.payload.order.entity.id;
                    const amount = this.getOriginalAmount(body.payload.order.entity.amount_paid);
                    return { orderId: orderId, amount, success: true }

                case "payment.failed":
                    const { order_id } = body.payload.payment?.entity ?? {};
                    return { orderId: order_id, success: false };
            }

        } catch (error) {

            console.log(`error in razorpay verify==>${error}`)
        }

    }

    async createOrder(amount: number, currency: string = "INR") {
        const options = {
            amount: Number(amount * 100),
            currency,
        }
        return await this.razorpay.orders.create(options)
    }

    getOriginalAmount(amount: number) {
        return amount / 100;
    }
}
