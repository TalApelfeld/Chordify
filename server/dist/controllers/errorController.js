"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHndler = globalErrorHndler;
function globalErrorHndler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    res.status(Number(err.statusCode)).json({
        status: err.status,
        message: err.message,
    });
}
