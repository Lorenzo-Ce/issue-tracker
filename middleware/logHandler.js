const winston = require('winston')
const { combine, timestamp, splat, simple } = winston.format;
const path = require('path')


const transports = [
    new winston.transports.File({
        filename: path.join(__dirname, '..', 'logs', 'errLog.txt'),
        level: 'error'
    }),
    new winston.transports.File({
        filename: path.join(__dirname, '..', 'logs', 'reqLog.txt'),
        level: 'info'
    })
]

const format = combine(timestamp({format: 'YYYY-MM-DD   HH:mm:ss'}), simple())

const logEvent = winston.createLogger({
    level: 'info', // logs only if higher than info level
    format,
    transports,
})

if (process.env.NODE_ENV !== 'production') {
    logEvent.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const logger = (req, res, next) => {
    // logEvent.info(`\t${req.header.origins}\t${req.method}\t${req.url}`)
    next()
}

module.exports = {logger, logEvent}