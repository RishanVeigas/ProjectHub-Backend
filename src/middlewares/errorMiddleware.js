import { success } from "zod";
import logger from "../config/logger.js";

const errorMiddleware=(err,req,res,next)=>{
    logger.error({
        message:err.message,
        stack:err.stack
    });

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errorCode: err.errorCode || "SERVER_ERROR"
    })
}

export default errorMiddleware;