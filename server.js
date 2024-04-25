import express, { urlencoded } from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import cookieParser from 'cookie-parser'
import { connectDb } from "./config/connectDb.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cookie parser middlware
app.use(cookieParser());
app.use(cors());
connectDb();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/users/", userRoutes);
