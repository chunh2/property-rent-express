const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

dotenv.config();

// Server

const app = express();

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));

// Server

// Middleware

app.use(express.json());
app.use(cookieParser());

// Middleware

// Route

app.use("/api", router);

// Route
