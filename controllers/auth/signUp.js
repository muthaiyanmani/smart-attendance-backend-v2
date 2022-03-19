const User = require("../../models/user");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Sign Up
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!(email && password && name)) {
      return res.status(400).json({
        message: "All fields are mandatory",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "Email already exists",
      });
    }

    const myPassword = await bcrypt.hash(password, 10);

    await User.create({
      email: email.toLowerCase(),
      password: myPassword,
      name,
    });
    res.status(201).json({ message: "registered success" });
  } catch (error) {
    res.status(400).json({
      message: "Couldn't sign up",
    });
  }
};
