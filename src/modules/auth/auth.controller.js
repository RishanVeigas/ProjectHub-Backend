import { success } from "zod";
import { register,login } from "./auth.services.js";
import {registerSchema,loginSchema} from "./auth.validation.js"

export const registerController=async(req,res,next)=>{
    try{
        const validated= registerSchema.parse(req.body)
        const user=await register(validated)

        res.status(201).json({
            success:true,
            message:"User registered",
            data:{
                id:user.id,
                email: user.email
            }
        })
    }catch(err){
        next(err)
    }
};

export const loginController=async(req,res,next)=>{
    try{
        const validated=await loginSchema.parse(req.body);
        const tokens=await login(validated);
        
        res.status(200).json({
            success:true,
            message:"Login Successful",
            data: tokens
        })
    }catch(err){
        next(err)
    }
};
