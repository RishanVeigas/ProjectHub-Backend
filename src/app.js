import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import errorMiddleware from "./middlewares/errorMiddleware.js";

import authRouters from "./modules/auth/auth.router.js";


const app=express();
app.use(helmet());
app.use(cors());
app.use(express.json())

app.use(morgan("dev"));

app.use("/api/auth",authRouters)

app.use(errorMiddleware)

app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"OK"
    })
})



export default app;
