const Student = require("../../models/student");

//Update Student
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
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
  try {
    await Student.findByIdAndUpdate(id, {
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
      updatedBy: author,
    });
    res.status(200).json({ message: "Student updated successfully." });
  } catch (error) {
    res.status(400).json({ message: "Unable to update a student." });
  }
};
