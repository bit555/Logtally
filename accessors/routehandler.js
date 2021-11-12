const xl2 = require("./excelfile-reader");

exports.posthandler = (req, res) => {
  // contains arrays of obj about uploaded files
  const pathraay = req.files;

  // array of full path of uploaded files
  let pathraay2 = pathraay.map((e) => e.path);
  const result = xl2.readFucntion(pathraay2);

  // return res.json({
  //   status: "OK",
  //   uploaded: req.files.length,
  //   missingValues: result,
  //   missingCount: result.length,
  // });

  return result;
};
