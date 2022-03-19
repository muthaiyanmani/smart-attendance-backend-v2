const express = require("express");
const { createClass } = require("../controllers/class/createClass");
const { getClass } = require("../controllers/class/getClass");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/class", auth, getClass);
router.post("/class", auth, createClass);

module.exports = router;
