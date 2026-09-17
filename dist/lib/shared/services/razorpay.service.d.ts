import { Request } from "express";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "@/src/config/env";
export declare class RazorPayService {
    private configService;
    private logger;
    private razorpay;
    constructor(configService: ConfigService<EnvironmentVariables>);
    validatePaymentRequest(req: Request): {
        orderId: any;
        amount: number;
        success: boolean;
    } | {
        orderId: any;
        success: boolean;
        amount?: undefined;
    };
    createOrder(amount: number, currency?: string): Promise<import("razorpay/dist/types/orders").Orders.RazorpayOrder>;
    getOriginalAmount(amount: number): number;
}
