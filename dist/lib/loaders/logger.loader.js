"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
require("winston-daily-rotate-file");
const constants_1 = require("../constants");
const LokiTransport = require("winston-loki");
const ProductionLogger = () => nest_winston_1.WinstonModule.createLogger({
    transports: [
        new LokiTransport({
            host: "http://127.0.0.1:3100",
            labels: { app: 'ed-hippo' },
            json: true,
            format: winston.format.json(),
            replaceTimestamp: true,
            onConnectionError: (err) => console.error(err)
        }),
        new winston.transports.DailyRotateFile({
            filename: `logs/%DATE%-error.log`,
            level: 'error',
            format: winston.format.combine(winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }), winston.format.json({ maximumDepth: 4 })),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
        }),
        new winston.transports.DailyRotateFile({
            filename: `logs/%DATE%-combined.log`,
            format: winston.format.combine(winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }), winston.format.json({ maximumDepth: 4 })),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: '30d',
        }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.cli(), winston.format.splat(), winston.format.prettyPrint({ colorize: true }), winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }), winston.format.printf((info) => {
                return `[${info.context}] - ${info.timestamp} ${info.level}:${info.message}`;
            })),
        }),
    ],
});
const DevelopmentLogger = () => nest_winston_1.WinstonModule.createLogger({
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.cli(), winston.format.splat(), winston.format.prettyPrint({ colorize: true }), winston.format.timestamp({ format: "YYYY/MM/DD, hh:mm:ss a" }), winston.format.printf((info) => {
                let basic = `[${info.context}] - ${info.timestamp} ${info.level}:${info.message}`;
                if (info.level == "error" && info.error)
                    basic += info.error?.toString();
                return basic;
            })),
        }),
    ],
});
exports.Logger = (process.env.NODE_ENV === constants_1.NODE_ENVIRONMENT.PRODUCTION) ? ProductionLogger() : DevelopmentLogger();
//# sourceMappingURL=logger.loader.js.map