import {CLIENT_ERROR} from "../httpCodes.js";
import {Response} from "express";

class ErrorHandler{

    public static handleHttpError(error:Error,sender:Response){
        sender.status(CLIENT_ERROR).json({error:error.message})
    }
}


export default ErrorHandler;