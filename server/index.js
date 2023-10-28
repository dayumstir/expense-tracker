const express = require("express");
const app = express();
const cors = require("cors")

const PORT = 8080;

// Middleware
app.use(cors())
app.use(express.json()); // req.body

// Routes

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
