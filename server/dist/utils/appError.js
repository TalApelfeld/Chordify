"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message); // 'message' property is from standard Error class
        this.status = `${statusCode.startsWith("4") ? "fail" : "erorr"}`;
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
exports.default = AppError;
