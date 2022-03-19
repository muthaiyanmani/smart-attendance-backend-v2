const User = require("../../models/user");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Sign In
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
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
        user: { token, name: user?.name },
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
};
