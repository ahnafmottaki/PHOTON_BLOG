class AppError extends Error {
  public isOperational = true;
  constructor(public statusCode: number, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
