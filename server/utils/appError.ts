class AppError extends Error {
  status: string;
  statusCode: string;
  isOperational: boolean;

  constructor(message: string, statusCode: string) {
    super(message); // 'message' property is from standard Error class
    this.status = `${statusCode.startsWith("4") ? "fail" : "erorr"}`;
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export default AppError;
