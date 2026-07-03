import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import errorMiddleware from "./middlewares/errorMiddleware.js";


const app=express();
app.use(helmet());
app.use(cors());
app.use(express.json())

app.use(morgan("dev"));

app.use(errorMiddleware)

app.get("/health",(req,res)=>{
    res.status(200).json({
        status:"OK"
    })
})



export default app;
