const Student = require("../../models/student");

//Get Student By Class
exports.getStudentsByClass = async (req, res) => {
  const { class: classRoom } = req.params;
  try {
    const data = await Student.find({ class: classRoom });
    const result = [];
    data &&
      data.map(
        ({ firstName, lastName, photoUrl, email, mobile, dateOfBirth, _id }) =>
          result.push({
            firstName,
            lastName,
            photoUrl,
            id: _id,
            email,
            mobile,
            dateOfBirth,
          })
      );
    res.status(200).send({ data: result });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch a student" });
  }
};
