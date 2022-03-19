const { Schema, model } = require("mongoose");

const studentSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  section: {
    type: String,
  },
  class: {
    type: String,
  },
  mediumOfInstruction: {
    type: String,
  },
  email: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  },
  address: {
    type: String,
  },
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  annualIncome: {
    type: String,
  },
  mobile: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  updatedBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Student", studentSchema);
