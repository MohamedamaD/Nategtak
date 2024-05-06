const express = require("express");
const APIRouter = require("./routes/API.route");
const cors = require("cors");
const connections = require("./utils/db");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/api/", APIRouter);

app.listen(port, () => {
  connections()
    .then(() => {
      console.log("connection is running");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(`Server is running on port ${port}`);
});
