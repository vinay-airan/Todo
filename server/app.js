import express from "express";
import dotenv from 'dotenv';
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.js";
import todoRouter from "./routes/todo.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();


connectDB();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true
}));
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
