const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const fs = require("fs");
const logDir = "./log";
const errLogDir = "./log/exception";
console.log(fs);
// 로그 폴더 없으면 새로 만들기
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

if (!fs.existsSync(errLogDir)) {
    fs.mkdirSync(errLogDir);
}

//logger 설정
exports.logger = new createLogger({
    transports: [
        new transports.Console({
            level: "debug",
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                format.colorize(),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
        }),
        new transports.DailyRotateFile({
            level: "info",
            filename: `${logDir}/%DATE%-log.log`,
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "7d",
            format: format.combine(
                format.timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                )
            ),
        }),
    ],
    exceptionHandlers: [
        new transports.DailyRotateFile({
            filename: `${errLogDir}/%DATE%-exception-log.log`,
            datePattern: "YYYY-MM-DD",
            maxSize: "10m",
            maxFiles: "7d",
        }),
    ],
});
