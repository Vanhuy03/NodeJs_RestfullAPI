import express from "express";
import dotenv from "dotenv";
import cors from "cors"


import mongoose from "mongoose";
import router from "./Routes";
const app = express();

dotenv.config();
const { PORT, DB_URI } = process.env;

app.use(cors())
app.use(express.json());
app.use("/api",router)

mongoose.connect(DB_URI).then(() => {
  console.log("Connected!");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});