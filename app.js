require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const cookie = require("cookie");
const sanitize = require("express-mongo-sanitize");
const cors = require("cors");
const User = require("./models/user");
const Comment = require("./models/comments");
const Class = require("./models/class");
const app = express();
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json()); // JSON parser
app.use(cookieParser()); // Cookie parser

app.use(sanitize()); // To prevent from XSS

//SignUp route
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({
        message: "Email already exists",
      });
    }
    //hashing secretKey
    const myPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: myPassword,
    });
    res.status(201).json({ message: "registered success" });
  } catch (error) {
    res.status(400).json({
      message: "Couldn't sign up",
    });
  }
});

//SignIn route
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      const options = {
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
      };
      res.setHeader("Set-Cookie", [cookie.serialize("token", token, options)]);
      res.status(200).json({
        message: "signin success",
        token,
      });
    } else {
      res.status(400).json({
        message: "Email or password not matched",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Coudn't signing in.",
    });
  }
});

//Create Class
app.post("/class", auth, async (req, res) => {
  const { name, teacher, section, year } = req.body;
  const { email } = req.user;
  const createClass = new Class({ name, teacher, section, year, email });
  try {
    await createClass.save();
    res.status(200).json({ message: "class created successfully." });
  } catch (error) {
    res.status(400).json({ message: "Unable to create a class" });
  }
});

//Get Class
app.get("/class", auth, async (req, res) => {
  try {
    const data = await Class.find();
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch a class" });
  }
});

module.exports = app;
