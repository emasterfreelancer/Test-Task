const Model = require("../models");
const { response } = require("../lang");
/**destructing model schema  */
const { CollegeModel, StudentModel } = Model;
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');

//Storage the folder functionality
var storage = multer.diskStorage({
destination: function (req, file, cd) {
cd(null, 'upload/')
},
filename: function (req, file, cd) {
cd(null, file.originalname)
}
});

//upload the file function
var upload = multer({ storage: storage }).any('');

//------------------------csvFileUpload------------------------
module.exports.csvFileUpload = (req, res) => {
upload(req, res, function (err) {
if (err) {
console.info("upload", err)
res.send(err)
} else {
    let imagename = req.files;
const map1 = imagename.map(async (file_data) => {
var filepath = file_data;
var Response=await csvConverts(file_data.path)
await fs.unlink(filepath.path, (err) => {
if (err) {
console.error(err)
} else {
console.info("CSV uploaded")
}
})
return res.json({
"success": Response.success,
"message": Response.message,
});
})
}
})
}

//------------------------CSV file Convert Data function------------------------
async function csvConverts(csvData) {
return new Promise(async(resolve) => {
let csvUrl = csvData
await fs.createReadStream(csvUrl)
.pipe(csv({mapHeaders: ({ header, index }) => header.trim()})).on('data', async (row) => {  
    var AddUserPayload = {
        name: row['CollegeName'],
        universityName:row['UniversityName'],
        city: row['DistrictName'],
        state: row['StateName'],
        collegeType:row['CollegeType'],
        totalStudents: row['TotalStudents'],
        courses: row['Courses'],
        yearFounded:row['YearFounded']
      };
      var dbAddCollege = await CollegeModel.create(AddUserPayload);
      resolve({"success":true,"message":"CSV uploaded"})
    })
  });
}