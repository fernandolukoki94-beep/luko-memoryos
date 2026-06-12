/**
 * Logger.ts
 * Sistema de logging estruturado para o jogo
 */

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private static instance: Logger;
  private logs: Array<{ timestamp: Date; level: LogLevel; message: string; data?: any }> = [];
  private maxLogs = 1000;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toLocaleTimeString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  debug(message: string, data?: any): void {
    const formatted = this.formatMessage(LogLevel.DEBUG, message);
    console.debug(formatted, data);
    this.addLog(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    const formatted = this.formatMessage(LogLevel.INFO, message);
    console.info(formatted, data);
    this.addLog(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    const formatted = this.formatMessage(LogLevel.WARN, message);
    console.warn(formatted, data);
    this.addLog(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any): void {
    const formatted = this.formatMessage(LogLevel.ERROR, message);
    console.error(formatted, data);
    this.addLog(LogLevel.ERROR, message, data);
  }

  private addLog(level: LogLevel, message: string, data?: any): void {
    this.logs.push({
      timestamp: new Date(),
      level,
      message,
      data,
    });

    // Manter apenas os últimos N logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  getLogs(): typeof this.logs {
    return [...this.logs];
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return this.logs
      .map((log) => {
        const timestamp = log.timestamp.toISOString();
        const dataStr = log.data ? ` | ${JSON.stringify(log.data)}` : '';
        return `${timestamp} [${log.level}] ${log.message}${dataStr}`;
      })
      .join('\n');
  }
}

export const logger = Logger.getInstance();
export default logger;
