const express = require("express");
const {
  getStudents,
  findById,
  findByName,
} = require("../controllers/API.controller");
const db = require("../utils/db");

const Router = express.Router();

Router.get("/find/id/:id", findById);
Router.get("/find/name/:name", findByName);
Router.get("/", getStudents);

module.exports = Router;
