# Image processing app using Loopback 3.x and Async module 

### Description
This project processes as following : 
- Uploads image through _multer_
- Check if that file exists
- Checks if that file is Image using _is-image_
- Renames that file to original file name
- Extract text from image using _tesseract_
- Changes file extension using _replace-ext_
- Writes extracted text to text file. 

### How to use ?
  ```
  git clone https://github.com/GauravChinavle/loopback3-img-process.git
  cd loopback3-img-process
  npm install
  nodemon .
  ```

### Technologies used
- [Nodejs](https://nodejs.org/en/) - _JavaScript runtime built on Chrome's V8 JavaScript engine_
- [Loopback 3.x](https://loopback.io/doc/en/lb3/) - _Highly-extensible, open-source Node. js framework that enables you to: Create dynamic end-to-end REST APIs with little or no coding. Access data from major relational databases, MongoDB, SOAP and REST APIs_

### Modules used
- [multer](https://www.npmjs.com/package/multer) - _Node.js middleware for handling multipart/form-data, which is primarily used for uploading files_
- [async](https://www.npmjs.com/package/async) - _Utility module which provides straight-forward, powerful functions for working with asynchronous JavaScript_
- [tesseract.js](https://www.npmjs.com/package/tesseract.js/v/2.1.1) - _A javascript library that gets words in almost any language out of images_
- [is-image](https://www.npmjs.com/package/is-image) - _To check if a file path is an image_
- [replace-ext](https://www.npmjs.com/package/replace-ext) - _Replaces a file extension with another one._
