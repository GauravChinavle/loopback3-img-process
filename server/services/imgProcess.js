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
  async.series(autoFunc, (err, result) => {
    if (!err) {
      console.log("Extracted text : " + result[3]);
      return true;
    }else{
      return false
    }
  });
};

function ifExists(callback) {
  console.log("Checking if file is present...");
  if (fs.existsSync(fileData.filename)) {
    console.log("The file does not exist.");
  } else {
    console.log("The file exists.");
    callback(null);
  }
}
function isImageFile(callback) {
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

function renameFile(callback) {
  console.log("Renaming file.....");
  const srcPath = path.join(__dirname, uploadPath, fileData.filename);
  const dstPath = path.join(__dirname, uploadPath, fileData.originalname); // Outputs '/a/b'
  fileData.actualPath = dstPath;
  fs.renameSync(srcPath, dstPath);
  console.log("Renaming done.");
  callback(null);
}
function extractText(callback) {
  Tesseract.recognize(fileData.actualPath, "eng")
    .then(({ data: { text } }) => {
      callback(null, text);
    })
    .catch(err => callback(err));
}

module.exports = imgProcess;
