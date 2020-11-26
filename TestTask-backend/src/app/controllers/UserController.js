const Model = require("../models");
const { response } = require("../lang");
/**destructing model schema  */
const { CollegeModel, StudentModel } = Model;

module.exports = { 
  addCollege: async (req, res) => {
    try {
      console.log(req.body)
      var { name, yearFounded, city, state, country, totalStudents, courses } = req.body;
      let findName = {
        name: name,
      };
      let findCollegeName = await CollegeModel.find(findName);
      console.log(findCollegeName)
      if (findCollegeName == null || findCollegeName.length==0 ) {
        var AddUserPayload = {
          name: name,
          yearFounded: yearFounded,
          city: city,
          state: state,
          country: country,
          totalStudents: totalStudents,
          courses: courses,
        };
        var dbAddCollege = await CollegeModel.create(AddUserPayload);
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: "Successfully College Added",
          data: dbAddCollege
        });
      } else {
          res.status(400).send({
            success: false,
            message: "College Already exists"
          });
        }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  }, 

  addStudent: async (req, res) => {
    try {
      console.log(req.body)
      var { name, batchYear, collegeId, skills } = req.body;
      let findName = {
        name: name,
      };
      let findStudentName = await StudentModel.find(findName);
      console.log(findStudentName)
      if (findStudentName == null || findStudentName.length==0) {
        var AddStudentPayload = {
          name: name,
          batchYear: batchYear,
          collegeId: collegeId,
          skills: skills,
        };
        var dbAddStudent = await StudentModel.create(AddStudentPayload);
        res.status(200).send({
          status: response.message.success.status,
          statusCode: response.message.success.statusCode,
          message: "Successfully Student Added",
          data: dbAddStudent
        });
      } else {
          res.status(400).send({
            success: false,
            message: "Student Already exists"
          });
        }
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  }, 

  collegeByState: async (req, res) => {
    try {
      var {
        state
      } = req.body;
      var dbClgByState = await CollegeModel.find({"state":state});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "College By State",
        filterCount:dbClgByState.length,
        data: dbClgByState,        
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },
  
  collegeByCourses: async (req, res) => {
    try {
      var {
        courses
      } = req.body;
      var dbClgByState = await CollegeModel.findOne({"courses":courses});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "College By State",
        data: dbClgByState
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  collegeByCity: async (req, res) => {
    try {
      var {
        city
      } = req.body;
      var dbClgBycity = await CollegeModel.find({"city":city});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "College By city",
        filterCount:dbClgBycity.length,
        data: dbClgBycity
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  studentById: async (req, res) => {
    try {
      var {
        id
      } = req.body;
      var dbStuById = await StudentModel.findOne({"_id":id});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "Student By Id",
        data: dbStuById
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  collegeByName: async (req, res) => {
    try {
      var {
        name
      } = req.body;
      var dbClgBycity = await CollegeModel.findOne({"name":name});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "College By Name",
        data: dbClgBycity
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  collegeById: async (req, res) => {
    try {
      var {
        id
      } = req.body;
      var dbClgById = await CollegeModel.findOne({"_id":id});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "College By Id",
        data: dbClgById
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

  allData:async (req, res) => {
    try {
      var showCollege = await CollegeModel.aggregate([
        {"$group" : {_id:"$state", count:{$sum:1}}}
      ])
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "All Data",
        data: showCollege
      });
    }catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },

   getCourses:async (req, res) => {
    try {
      var showCollege = await CollegeModel.aggregate([
        {"$group" : {_id:"$courses", count:{$sum:1}}}
      ])
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "All Data",
        data: showCollege
      });
    }catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },
  studentByClgId: async (req, res) => {
    try {
      var {
        collegeId
      } = req.body;
      var dbStuClgId = await StudentModel.find({"collegeId":collegeId});
      res.status(200).send({
        status: response.message.success.status,
        statusCode: response.message.success.statusCode,
        message: "Student By Clg Id",
        data: dbStuClgId
      });
    } catch (error) {
      res.status(400).send({
        status: response.message.error.messageError,
        statusCode: response.message.error.statusCode,
        message: response.message.error.messageError
      });
    }
  },


};
