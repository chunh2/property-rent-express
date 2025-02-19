const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

// Server

const app = express();

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));

// Server
