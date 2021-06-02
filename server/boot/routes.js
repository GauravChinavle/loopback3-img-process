const multer = require("multer");
var upload = multer({ dest: "uploads/" });
const imgProcess = require("../services/imgProcess");
module.exports = function(app) {
  var router = app.loopback.Router();

  router.post("/upload", upload.single("image"), async function(req, res) {
    var fileData = req.file;
    let message ='';
    if(imgProcess(fileData)) message+='error occured.';
    res.send({
      message: message || "Your text extracted from image",
    });
  });

  router.get("/test", function(req, res) {
    res.send("Routes are working");
  });

  app.use(router);
};
