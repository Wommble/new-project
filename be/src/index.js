import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { useRouter } from "./routes/router.js";
import { loggedRouter } from "./routes/router.js";

const port = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(loggedRouter);
app.use(useRouter);

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://Wommble:BW!hZwdyvh33.BS@cluster0.wsaxgms.mongodb.net/DataBase"
  );
  console.log("database connected");
};

connectDb();

app.listen(port, () => {
  console.log(`it is running on http://localhost:${port}`);
});
