const mongoose = require("mongoose");
const schemaValidator = require("./validator/schemaValidator");
const Mixed = mongoose.Schema.Types.Mixed;

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    batchYear: {
      type: String,
      required: false
    },
    collegeId: {
      type: String,
      required: false
    },
    skills: {
      type: Array,
      required: false
    },
    status: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);
module.exports = studentSchema;
