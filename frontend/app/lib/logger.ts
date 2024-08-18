import winston from "winston";

// Function to get the local timestamp with the timezone
const getLocalTimestamp = () => {
    return new Date().toLocaleString('de-DE', {
        timeZoneName: 'short',   // This adds the timezone abbreviation (e.g., GMT, PST)
        hour12: false,           // Use 24-hour format
    });
};

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
        winston.format.timestamp({ format: getLocalTimestamp }), // Use local timestamp with timezone
        winston.format.printf(({ timestamp, level, message, ...metadata }) => {
            return `${timestamp} [${level}]: ${message} ${Object.keys(metadata).length ? JSON.stringify(metadata) : ''}`;
        }),
    ),
    transports,
});

export default logger;
