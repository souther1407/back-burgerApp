import {Request,Response,NextFunction} from "express";
import {UNAUTHORIZED} from "../httpCodes";
import jwt from "jsonwebtoken";
import {config}from "dotenv";
config();
const {SECRET} = process.env;
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    const token= req.headers.authorization?.split(" ")[1];
    if(!token) res.status(UNAUTHORIZED).json({error:"no permitido"})
    else{
        req.headers.authorization=token;
        next();
    }
}

export const isTokenValid = (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers.authorization as string;
    try {
        const payload=jwt.verify(token,SECRET as string)
        next();
    } catch (error) {
        res.status(UNAUTHORIZED).json(error);
    }
}