const Student = require("../../models/student");

//Get Student By Id
exports.getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Student.find({ _id: id });
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch a student" });
  }
};
