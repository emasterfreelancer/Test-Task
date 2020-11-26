/* const AdminController = require('./AdminController');*/
const UserController = require("./UserController");
const CsvController = require("./CsvController");


const controllers = {
  UserController: UserController,
  CsvController:CsvController
};

module.exports = controllers;
