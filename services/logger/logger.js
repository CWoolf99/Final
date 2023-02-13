import pino from "pino";

const infoLogger = pino();
infoLogger.level = "info";

const warnLogger = pino("warn.log");
warnLogger.level = "warn";

const errorLogger = pino("error.log");
errorLogger.level = "error";

export { infoLogger, warnLogger, errorLogger };
