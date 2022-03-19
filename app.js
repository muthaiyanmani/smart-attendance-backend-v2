require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const sanitize = require("express-mongo-sanitize");
const cors = require("cors");

//Routes
const authRoute = require("./routes/auth");
const classRoute = require("./routes/class");
const studentsRoute = require("./routes/student");

const app = express();
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json()); // JSON parser
app.use(cookieParser()); // Cookie parser

app.use(sanitize()); // To prevent from XSS

app.use("/api", authRoute);
app.use("/api", classRoute);
app.use("/api", studentsRoute);

module.exports = app;
