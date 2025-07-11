import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import courseRoute  from "./routes/course.route.js"
import mediaRoute from "./routes/media.route.js";
dotenv.config({});
connectDB();
const app =express();

const PORT=process.env.PORT||3000;

//default middleware
app.use(express.json());

app.use(cookieParser());



app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you're using cookies
}));

//apis
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

"http://localhost:8080/api/v1/user/register"



app.listen(PORT, ()=>{
    console.log(`server listen at port ${PORT}`)
})



