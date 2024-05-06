const db = require("../utils/db");
const Grade = require("../models/student.model");

const getStudents = async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const result = await Grade.find({}).limit(limit);
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
const findById = async (req, res) => {
  try {
    const result = await Grade.findOne({ seating_no: req.params.id });
    if (!result || result.length === 0) {
      return res.status(404).json({ status: "not found", data: [] });
    }
    res.status(200).json({ status: "success", data: [result] });
  } catch (err) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};
const findByName = async (req, res) => {
  try {
    const searchName = req.params.name;
    const result = await Grade.find({
      arabic_name: { $regex: searchName, $options: "i" },
    });

    if (!result || result.length === 0) {
      return res.status(404).json({ status: "not found", data: [] });
    }

    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.error("Error:", error);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = { getStudents, findById, findByName };
