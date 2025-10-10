interface LogContext {
  [key: string]: any;
}

interface Logger {
  error: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  debug: (message: string, context?: LogContext) => void;
}

const createLogger = (): Logger => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const formatLog = (level: string, message: string, context?: LogContext) => {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(context && { context }),
    };

    if (isDevelopment) {
      (console as any)[level]?.(JSON.stringify(logEntry, null, 2));
    } else {
      (console as any)[level]?.(JSON.stringify(logEntry));
    }
  };

  return {
    error: (message: string, context?: LogContext) => formatLog('error', message, context),
    warn: (message: string, context?: LogContext) => formatLog('warn', message, context),
    info: (message: string, context?: LogContext) => formatLog('info', message, context),
    debug: (message: string, context?: LogContext) => {
      if (isDevelopment) {
        formatLog('debug', message, context);
      }
    },
  };
};

export const logger = createLogger();
