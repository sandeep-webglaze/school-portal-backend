import * as winston from 'winston';
import { WinstonModule } from "nest-winston";
import 'winston-daily-rotate-file';
import { NODE_ENVIRONMENT } from '../constants';
const LokiTransport = require("winston-loki");

const ProductionLogger = () => WinstonModule.createLogger({
    transports: [
        new LokiTransport({
            host: "http://127.0.0.1:3100",
            labels: { app: 'ed-hippo' },
            json: true,
            format: winston.format.json(),
            replaceTimestamp: true,
            onConnectionError: (err) => console.error(err)
        }),
        // file on daily rotation (error only)
        new winston.transports.DailyRotateFile({
            // %DATE will be replaced by the current date
            filename: `logs/%DATE%-error.log`,
            level: 'error',
            format: winston.format.combine(winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }), winston.format.json({ maximumDepth: 4 })),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false, // don't want to zip our logs
            maxFiles: '30d', // will keep log until they are older than 30 days
        }),
        // same for all levels
        new winston.transports.DailyRotateFile({
            filename: `logs/%DATE%-combined.log`,
            format: winston.format.combine(winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }), winston.format.json({ maximumDepth: 4 })),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
        }),
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.cli(),
                winston.format.splat(),
                winston.format.prettyPrint({ colorize: true }),
                winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }),
                winston.format.printf((info) => {
                    return `[${info.context}] - ${info.timestamp} ${info.level}:${info.message}`;
                }),
            ),
        }),
    ],
});

const DevelopmentLogger = () => WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.cli(),
                winston.format.splat(),
                winston.format.prettyPrint({ colorize: true }),
                winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }),
                winston.format.printf((info) => {
                    let basic = `[${info.context}] - ${info.timestamp} ${info.level}:${info.message}`;
                    if (info.level == "error" && info.error) basic += info.error?.toString();
                    return basic;
                }),
            ),
        }),
    ],
});

export const Logger = (process.env.NODE_ENV === NODE_ENVIRONMENT.PRODUCTION) ? ProductionLogger() : DevelopmentLogger();
