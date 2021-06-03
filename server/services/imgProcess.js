const async = require("async");
var path = require("path");
const fs = require("fs");
const Tesseract = require("tesseract.js");
const isImage = require("is-image");
var replaceExt = require('replace-ext');

const uploadPath = `../../uploads/`;
const downloadPath = `../../uploads/docs/`;
const autoFunc = [ifExists, isImageFile, renameFile, extractText,saveToFile];
var fileData = "";

const imgProcess = file => {
  fileData = file;
  return new Promise((resolve,reject)=>{async.waterfall(autoFunc, (err, result) => {
    if (!err) {
      console.log("result",result)
      resolve(result)
      
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

function saveToFile(arg1,callback){                 // save extracted text to file
  try{
    const srcPath = path.join(__dirname, downloadPath,replaceExt(fileData.originalname, '.text'));
    fs.writeFileSync(srcPath, arg1);
    console.log("Text written to text")
    callback(null,arg1);
  }
  catch(err){
    console.log(err);
    callback('Error writing file')
  }
}

module.exports = imgProcess;
