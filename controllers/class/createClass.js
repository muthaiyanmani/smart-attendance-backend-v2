const Class = require("../../models/class");

//Create Class
exports.createClass = async (req, res) => {
  const { name, teacher, section, year } = req.body;
  if (!(name && teacher && section && year))
    return res.status(400).json({ message: "All fields are mandatory" });
  const { email } = req.user;
  const createClass = new Class({
    name,
    teacher,
    section,
    year,
    createdBy: email,
  });
  try {
    await createClass.save();
    res.status(200).json({ message: "class created successfully." });
  } catch (error) {
    res.status(400).json({ message: "Unable to create a class." });
  }
};
