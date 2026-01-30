import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

// db connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  app.get("/api/users", (req, res) => {
  res.json([]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
