const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/auth/signIn");
const { signup } = require("../controllers/auth/signUp");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
