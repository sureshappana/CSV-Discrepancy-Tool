import winston from 'winston';

/**
 * logger utility
 */
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

export default logger;