const express = require("express");
const path = require("path");

const posthandler = require("./accessors/routehandler");
const upload = require("./accessors/mutler-accessor");
let resultarry;
const app = express();
app.use(express.static(path.join(__dirname, "tabletesting")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src/index.html"));
});
app.post(
  "/uploadfiles",
  upload.upload.any("mainfileData", "logfileData"),
  (req, res) => {
    resultarry = posthandler.posthandler(req, res);
    res.sendFile(path.join(__dirname, "tabletesting/table.html"));
  }
);

app.get("/tableresult", (req, res) => {
  // console.log(resultarry);
  return res.send(resultarry);
});

app.listen(3222, () => {
  console.log("Application is running at http://localhost:3222");
});
