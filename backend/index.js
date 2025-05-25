import express from "express";
import cors from "cors";
import auth from "./routes/auth.js";
import connectToMongoDB from "./db/db.js";
import noteRouter from "./routes/note.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);
app.use("/api/note", noteRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
