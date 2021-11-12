const exlsx = require("xlsx");
const {
  UniqueNameSetMain,
  UniqueNameSetLog,
  compare,
} = require("./unique-compare-builder");

const path = require("path");

exports.readFucntion = (arrFilename) => {
  let worksheets = {};
  let worksheetsarrMainfile = [];
  let worksheetsarrlogfile = [];
  let mainfile;
  let logfile;
  arrFilename.forEach((file) => {
    const workbook = exlsx.readFile(file);
    if (file.includes("logfile")) {
      for (let sheetname of workbook.SheetNames) {
        // workbook contains sheet1,, sheet2.. so on in
        // worksheets[sheetname] = exlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
        worksheetsarrlogfile.push(
          exlsx.utils.sheet_to_json(workbook.Sheets[sheetname])
        ); // data is in {Sheets{sheet1:[],sheet2:[]}}
      }
    } else {
      for (let sheetname of workbook.SheetNames) {
        // workbook contains sheet1,, sheet2.. so on in
        // worksheets[sheetname] = exlsx.utils.sheet_to_json(workbook.Sheets[sheetname]);
        worksheetsarrMainfile.push(
          exlsx.utils.sheet_to_json(workbook.Sheets[sheetname])
        ); // data is in {Sheets{sheet1:[],sheet2:[]}}
      }
    }
  });

  worksheets["MainSheet"] = worksheetsarrMainfile.flat(); // spreading  [ [{}],[{}]] into [{},{}] and setting { mainflie: [{},{}]}
  worksheets["LogSheet"] = worksheetsarrlogfile.flat();
  // console.log("mainfile raw data", worksheets.MainSheet);
  // console.log("logfile raw data", worksheets.LogSheet);

  mainfile = [...new UniqueNameSetMain(worksheets.MainSheet)]; //converting arrayof obj in set and spreading to arraay [{1},{1},{2}] ==>{{1},{2}} ==>[{1},{2}]
  logfile = [...new UniqueNameSetLog(worksheets.LogSheet)];

  // console.log("mainfile data =====>", mainfile);
  // console.log("logfile data =====>", logfile);
  // console.log("mainfile counts", worksheets.MainSheet.length);
  // console.log("mainfile unique counts =====>", mainfile.length);
  // console.log("logfile counts", worksheets.LogSheet.length);
  // console.log("logfile unique counts =====>", logfile.length);

  const PortalFileTotalCount = worksheets.MainSheet.length;
  const PortalFileUniqueCount = mainfile.length;
  const LogFileTotalCount = worksheets.LogSheet.length;
  const LogFileUniqueCount = logfile.length;

  const missingValuearr = compare(mainfile, logfile);

  if (missingValuearr.length !== 0) {
    const writefile = exlsx.utils.json_to_sheet(missingValuearr);
    const xlNewBook = exlsx.utils.book_new();
    xlNewBook.SheetNames.push("Missing Log values");
    xlNewBook.Sheets["Missing Log values"] = writefile;
    exlsx.writeFile(xlNewBook, path.resolve("output", "outputexcel.xlsx"));
  }

  return {
    missingValuearr,
    PortalFileUniqueCount,
    LogFileUniqueCount,
    LogFileTotalCount,
    PortalFileTotalCount,
  };
};

//console.log(Object.keys(worksheets).length); //gives number os sheets in workbook
