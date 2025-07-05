import dotenv from 'dotenv';
dotenv.config({});
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToDB from "./utils/db.js";

import userRoute from './routes/userRoutes.js';
import companyRoute from './routes/companyRoutes.js';
import jobRoute from './routes/jobRoute.js';
import applicationRoute from './routes/applicationRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    // origin:'http://localhost:5173',
    origin:'https://portal-ivory-pi.vercel.app',
    credentials:true
}

app.use(cors(corsOptions));
// connectToDB();
const PORT = process.env.PORT || 3000;

// api's

app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
app.get('/',(req,res)=>{
    res.json("helo");
})
app.listen(PORT,()=>{
    connectToDB();
    // console.log(connectToDB())
    console.log(`Server is running on port ${PORT}`)
})
