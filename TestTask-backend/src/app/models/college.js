const mongoose = require("mongoose");
const schemaValidator = require("./validator/schemaValidator");
const Mixed = mongoose.Schema.Types.Mixed;

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false
    },
    universityName: {
      type: String,
      required: true
    },
    collegeType: {
      type: String,
      required: true
    },
    yearFounded: {
      type: String,
      required: false
    },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    totalStudents: {
      type: Number,
      required: true
    },    
    courses: {
      type: String,
      required: false 
    },
    isDeleted: {
      type: Number,
      default: 0
    },
    status: {
      type: Number,
      default: 0
    },
  },
  { timestamps: true }
);
module.exports = collegeSchema;
