import express from "express";
import cors from "cors";
const app = express();

const PORT = 8080;

import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes"

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes
app.use("/users", userRoutes);
app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
