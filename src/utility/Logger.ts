import winston from 'winston';
const { info, debug, error } = winston;

export class Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static logInfo(message: any): void {
    info(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static logDebug(message: any): void {
    debug(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static logError(message: any): void {
    error(message);
  }
}
