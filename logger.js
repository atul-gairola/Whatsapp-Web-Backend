const {
  createLogger,
  format: { combine, splat, timestamp, colorize, printf, simple, label },
  transports,
} = require("winston");

const myFormat = printf(({ level, message, label, timestamp, ...metadata }) => {
  let msg = `[${level}] [${timestamp}] : ${message}`;
  return msg;
});

const childProcessFormat = printf(
  ({ level, message, timestamp, label, ...metadata }) => {
    let msg = `child_prc_${label} :: [${level}] [${timestamp}] : ${message}`;
    return msg;
  }
);

exports.generateLogger = (labelName) => {
  const logger = createLogger({
    format: combine(
      colorize(),
      splat(),
      label(labelName),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      myFormat
    ),
    transports: [
      new transports.Console({
        format: combine(colorize()),
      }),
      new transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
    ],
  });

  if (process.env.NODE_ENV === "production") {
    logger.add(new transports.File({ filename: "logs/combined.log" }));
  }

  return logger;
};

exports.generateCpLogger = (labelName) => {
  const logger = createLogger({
    format: combine(
      colorize(),
      splat(),
      label({ label: labelName }),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      childProcessFormat
    ),
    transports: [
      new transports.Console({
        format: combine(colorize()),
      }),
      new transports.File({
        filename: `logs/cp/error.log`,
        level: "error",
      }),
    ],
  });

  if (process.env.NODE_ENV === "production") {
    logger.add(new transports.File({ filename: `logs/cp/combined.log` }));
  }

  return logger;
};
