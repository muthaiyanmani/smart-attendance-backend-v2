const express = require("express");
const { createStudent } = require("../controllers/students/createStudent");
const { getStudentById } = require("../controllers/students/getStudentById");
const {
  getStudentsByClass,
} = require("../controllers/students/getStudentsByClass");
const { updateStudent } = require("../controllers/students/updateStudent");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/students/:class", auth, getStudentsByClass);
router.get("/student/:class/:id", auth, getStudentById);
router.put("/student/:id", auth, updateStudent);
router.post("/student", auth, createStudent);

module.exports = router;
