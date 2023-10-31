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


// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (err) {
//     if (err instanceof Error) {
//       console.error(err.message);
//     } else {
//       console.log("Unexpected error", err);
//     }
//   }
// });

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
