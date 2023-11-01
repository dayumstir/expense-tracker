import express from "express";
const app = express();
import cors from "cors";

const PORT = 8080;

import userRoutes from "./routes/userRoutes";

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
