import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 5000;

const server=app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})

process.on("SIGINT",async()=>{
    logger.info("Shutting down Server....");

    await print.$disconnect();

    server.close(()=>{
        process.exit(0);
    })
})