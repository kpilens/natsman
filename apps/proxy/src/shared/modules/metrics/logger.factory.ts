/**
 * Since logging is very important in SOA Architectures we are configuring winston to 
 * pipe logs from the application into a Time series database of our choice. This logger wraps around winston
 */

import { format, transports, addColors, LoggerOptions } from "winston";
import { MESSAGE } from 'triple-beam';
import * as dotenv from 'dotenv';

dotenv.config();
export class LoggerFactory {
    private readonly options: LoggerOptions;

    private static instance: LoggerFactory;

    public static getInstance(): LoggerFactory {
        if (!LoggerFactory.instance) {
            LoggerFactory.instance = new LoggerFactory();
        }

        return LoggerFactory.instance;
    }

    private defaultFormat() {
        return format.combine(
            format.timestamp(),
            format.label({ label: 'server' }),
            format.metadata({
                fillExcept: ['message', 'level', 'timestamp', 'label']
            })
        );
    }

    private stagingFormat() {
        return format.combine(
            this.defaultFormat(),
            format.colorize({
                all: true
            }),
            format.timestamp({
                format: "YY-MM-DD HH:MM:SS"
            }),
            format.splat(),
            format.colorize(),
            format.errors({ stack: true }),
            format.colorize(),
            format.printf((info) => {
                const reqId = info.metadata.reqId;
                delete info.metadata.reqId;

                return (`[${info.level}]  ${info.timestamp} ${reqId ? `| ${reqId}` : ''} | ${info.message} | ${JSON.stringify(info.metadata)}`);
            })
        );
    }

    private productionFormat() {
        return format.combine(
            this.defaultFormat(),
            format((info) => {
                const reqId = info.metadata.reqId;
                delete info.metadata.reqId;

                info.reqId = reqId;

                if (typeof info.message === 'object' && info.message !== null) {
                    info.message = JSON.stringify(info.message);
                }

                const { level, timestamp, label } = info;

                const message = {
                    level,
                    timestamp,
                    label,
                    reqId,
                    metadata: info.metadata,
                    message: info.message
                };

                delete info.metadata;
                delete info.message;
                delete info.level;
                delete info.timestamp;
                delete info.label;




                info[MESSAGE] = JSON.stringify(message);

                return info;
            })()
        );
    }

    constructor() {
        this.options = {
            format: process.env.NODE_ENV === 'production' ? this.productionFormat() : this.stagingFormat(),
            transports: [
                new transports.Console({
                    level: process.env.LOG_LEVEL,
                    silent: false,
                    debugStdout: true,
                    handleExceptions: true,
                })
            ],
            exitOnError: false // do not exit on handled exceptions
        };
    }

    public console(): LoggerOptions {
        return this.options;
    }
}

addColors({
    error: 'bold green redBG',
    warn: 'italic black yellowBG',
    info: 'green',
    http: 'grey',
    verbose: 'magenta',
    debug: 'yellow',
    silly: 'bold gray magentaBG'
});
