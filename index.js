const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const path = require("path");

//const userRoutes = require("./routes/userRoutes");
const borrowRoutes = require("./routes/borrowRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(express.json()); // Middleware to parse JSON bodies
//app.use("/api/users", userRoutes);
app.use("/api/borrows", borrowRoutes);
app.use(express.static(path.join(__dirname, "dist"))); 
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

