const multer = require("multer");
var upload = multer({ dest: "uploads/" });
const imgProcess = require("../services/imgProcess");
module.exports = function(app) {
  var router = app.loopback.Router();

  router.post("/upload", upload.single("image"), async function(req, res) {
    var fileData = req.file;
    let message = "";
    await imgProcess(fileData)
      .then(item =>
        res.send({
          message: "Your text extracted from image",
          text: item
        })
      )
      .catch(err =>
        res.send({
          message: "Error : "+err
        })
      );
    //if(imgProcess(fileData)) message+='error occured.';
  });

  router.get("/test", function(req, res) {
    res.send("Routes are working");
  });

  app.use(router);
};
