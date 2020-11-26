 const mongoose = require("mongoose");
const beautifyUnique = require("mongoose-beautiful-unique-validation");
const college = require("./college");
const student = require("./student");


const { config } = require("../config");

mongoose.connect(
  config.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  },
  (err, con) => {
    if (err) {
      throw err;
    } else {
      console.log("mongodb connected");
    }
  }
);

const database = {
  CollegeModel: mongoose.model("college", college),
  StudentModel: mongoose.model("student", student)
};

module.exports = database;
