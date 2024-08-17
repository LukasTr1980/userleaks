import winston from "winston";

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
    }),
];

const logger = winston.createLogger({
    level: logLevel,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    transports,
});

export default logger;