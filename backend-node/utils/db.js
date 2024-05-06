const mongoose = require("mongoose");

const connections = async () => {
  await mongoose.connect(process.env.MONGODB_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
module.exports = connections;
