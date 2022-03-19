const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  section: {
    type: String,
  },
  teacher: {
    type: String,
  },
  year: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Class", classSchema);
