import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import connectToDB from "./utils/db.js";
dotenv.config({});
// MONGO_URI=mongodb+srv://vishwakarmashubhi80:FNzckjzDOY45g75q@cluster0.eocbc5l.mongodb.net/portal
// PORT=8080
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    connectToDB();
    console.log(`Server is running on port ${PORT}`)
})