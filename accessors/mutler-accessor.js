const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("dest req===>", req);
    //console.log("dest file===>", file);
    const { fieldname } = file;
    const uploadfolder =
      fieldname === "mainfileData" ? "uploads/mainfile" : "uploads/logfile";
    cb(null, uploadfolder);
  },
  filename: (req, file, cb) => {
    // console.log("file ==>>>", file);
    const { originalname } = file;
    cb(null, originalname);
  },
});

exports.upload = multer({ storage });
