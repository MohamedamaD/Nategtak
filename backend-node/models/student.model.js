const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  seating_no: Number,
  arabic_name: String,
  total_degree: Number,
  student_case_desc: String,
});

const Grade = mongoose.model("Grades", gradeSchema);

module.exports = Grade;
