const multer = require("multer");

function fileUploader(req, res, next) {
  var imageName;

  var uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "/uploads");
    },
    filename: function (req, file, cb) {
      imageName = file.originalname;
      //imageName += "_randomstring"
      cb(null, imageName);
    },
  });

  var upload = multer({ storage: uploadStorage });

  var uploadFile = upload.single("image1");

  uploadFile(req, res, function (err) {
    req.imageName = imageName;
    req.uploadError = err;
    // console.log(req.file, "UPLOADED");
    next();
  });
}

module.exports = fileUploader;
