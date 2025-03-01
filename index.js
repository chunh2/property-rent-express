const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// Server

const app = express();

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));

// Server

// Middleware

const allowedOrigin = process.env.ALLOW_ORIGIN;

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

// Middleware

// Route

app.use("/api", router);

// Route
