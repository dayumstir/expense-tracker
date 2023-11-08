import express from "express";
import cors from "cors";
const app = express();

const PORT = 8080;

import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes";
import expenseRoutes from "./routes/expenseRoutes";

// Middleware
app.use(cors());
app.use(express.json()); // req.body

// Routes
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
