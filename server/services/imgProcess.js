const async = require("async");
var path = require("path");
const fs = require("fs");
const Tesseract = require("tesseract.js");
const isImage = require("is-image");

const uploadPath = `../../uploads/`;
const autoFunc = [ifExists, isImageFile, renameFile, extractText];
var fileData = "";

const imgProcess = file => {
  fileData = file;
  return new Promise((resolve,reject)=>{async.series(autoFunc, (err, result) => {
    if (!err) {
      resolve(result[3])
      
    }else{
      reject(err)
    }
  });})
};

function ifExists(callback) {                       //To check if the file exists
  console.log("Checking if file is present...");
  if (fs.existsSync(fileData.filename)) {
    console.log("The file does not exist.");
  } else {
    console.log("The file exists.");
    callback(null);
  }
}
function isImageFile(callback) {                      //To check if the input file is Image
  console.log("Checking if file is image...");
  const dstPath = path.join(__dirname, uploadPath, fileData.originalname);
  if (isImage(fileData.originalname)) {
    console.log("The file is image.");
    callback(null);
  } else {
    console.log("The file does not exist.");
    callback("ERROR");
  }
}

function renameFile(callback) {                         //To change the file name to original file name
  console.log("Renaming file.....");
  const srcPath = path.join(__dirname, uploadPath, fileData.filename);
  const dstPath = path.join(__dirname, uploadPath, fileData.originalname); // Outputs '/a/b'
  fileData.actualPath = dstPath;
  fs.renameSync(srcPath, dstPath);
  console.log("Renaming done.");
  callback(null);
}
function extractText(callback) {                            //To extract the text from the given image
  Tesseract.recognize(fileData.actualPath, "eng")
    .then(({ data: { text } }) => {
      callback(null, text);
    })
    .catch(err => callback(err));
}

module.exports = imgProcess;
