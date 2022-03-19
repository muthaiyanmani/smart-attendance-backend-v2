const Student = require("../../models/student");
//Create Student
exports.createStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    class: classRoom,
    mediumOfInstruction,
    email,
    dateOfBirth,
    address,
    fatherName,
    fatherOccupation,
    motherName,
    motherOccupation,
    annualIncome,
    mobile,
    photoUrl,
  } = req.body;

  if (
    !(
      firstName &&
      lastName &&
      classRoom &&
      mediumOfInstruction &&
      dateOfBirth &&
      address &&
      fatherName &&
      motherName &&
      annualIncome &&
      mobile
    )
  )
    return res.status(400).json({ message: "All fields are mandatory" });
  const { email: author } = req.user;

  const createStudent = new Student({
    firstName,
    lastName,
    class: classRoom,
    mediumOfInstruction,
    email,
    dateOfBirth,
    address,
    fatherName,
    fatherOccupation,
    motherName,
    motherOccupation,
    annualIncome,
    mobile,
    photoUrl,
    createdBy: author,
  });

  try {
    await createStudent.save();
    res.status(200).json({ message: "Student created successfully." });
  } catch (error) {
    res.status(400).json({ message: "Unable to create a student." });
  }
};
