const express = require('express');
const router = express.Router();
const controllers = require('./app/controllers');
const Model = require("./app/models");

/******* ROUTES START ********/

router
   .post(
      '/addCollege', 
      controllers.UserController.addCollege
   ) 
   .post(
      '/addStudent', 
      controllers.UserController.addStudent
   ) 
   .post(
      '/collegeByState', 
      controllers.UserController.collegeByState
   ) 
   .post(
      '/collegeByCourses', 
      controllers.UserController.collegeByCourses
   ) 
   .post(
      '/collegeByCity', 
      controllers.UserController.collegeByCity
   ) 
   .post(
      '/studentById', 
      controllers.UserController.studentById
   ) 
   .post(
      '/collegeByName', 
      controllers.UserController.collegeByName
   ) 
   .post(
      '/collegeById', 
      controllers.UserController.collegeById
   ) 
   .post(
      '/csvFileUpload', 
      controllers.CsvController.csvFileUpload
   ) 
   .get(
      '/allData', 
      controllers.UserController.allData
   ) 
   .get(
      '/getCourses', 
      controllers.UserController.getCourses
   ) 
   .post(
      '/studentByClgId', 
      controllers.UserController.studentByClgId
   ) 


/******* ROUTES END ********/
  
module.exports = router;


