const Class = require("../../models/class");

exports.getClass = async (req, res) => {
  try {
    const data = await Class.find();
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ message: "Unable to fetch a class" });
  }
};
