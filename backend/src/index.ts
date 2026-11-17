import express from "express";
import "dotenv/config";
import rootRouter from "./app/index.js";
import { db } from "./prisma/db.js";

const app = express();
const PORT = process.env.PORT;


//middlewares
app.use(express.json());

//routes
app.use("/api/v1", rootRouter);


async function startServer(){
    try{
        await db.connect();
        console.log("Database connected successfully");
        app.listen(PORT,() => {
            console.log(`App is listening on PORT ${PORT}`);
        });
    }catch(error){  
        console.error("Data connection failed", error);
        process.exit(1);
    }
} 

startServer();