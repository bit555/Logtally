let div1 = document.querySelector("#h11");
let h4 = document.querySelector("#h4");
let p = document.querySelector("#PTage_fileinfo");
div1.innerHTML = "Show Table ";

const result = async () => {
  const r1 = await fetch("/tableresult");
  const r2 = await r1.json();
  console.log("in fetch ", r2);
  return r2;
};
const tableMaker = async () => {
  const excelobj = await result(); //excelarry will be excelobj
  console.log("outside tablefuc ", excelobj);

  const tablefunc = (dataobj) => {
    console.log("inside table func ", dataobj);
    let myTable = document.querySelector("#excel_data");
    let dataarry = dataobj.missingValuearr;
    let PortalFileTotalCount = dataobj.PortalFileTotalCount;
    let PortalFileUniqueCount = dataobj.PortalFileUniqueCount;
    let LogFileTotalCount = dataobj.LogFileTotalCount;
    let LogFileUniqueCount = dataobj.LogFileUniqueCount;
    p.innerHTML = `Portal File Total Count : ${PortalFileTotalCount}  , Portal File Unique Count : ${PortalFileUniqueCount} <br><br> Log File Total Count : ${LogFileTotalCount}  , Log File Unique Count : ${LogFileUniqueCount} \n `;
    if (dataarry.length == 0) {
      h4.innerHTML = "Log file is proper, No missing values found";
      div1.style.visibility = "hidden";
    } else {
      let headers = [];
      for (let key in dataarry[0]) {
        headers.push(key);
      }

      div1.addEventListener(
        "click",
        () => {
          let table = document.createElement("table");
          let headerRow = document.createElement("tr");

          headers.forEach((headerText) => {
            let header = document.createElement("th");
            let textNode = document.createTextNode(headerText);
            header.appendChild(textNode);
            headerRow.appendChild(header);
          });

          table.appendChild(headerRow);

          dataarry.forEach((emp) => {
            let row = document.createElement("tr");

            Object.values(emp).forEach((text) => {
              let cell = document.createElement("td");
              let textNode = document.createTextNode(text);
              cell.appendChild(textNode);
              row.appendChild(cell);
            });

            table.appendChild(row);
          });
          if (dataarry.length == 1) {
            h4.innerHTML = `ohh no! ${dataarry.length} value of Portal is not present in log File `;
          } else {
            h4.innerHTML = `ohh no! these ${dataarry.length} values of Portal are not present in log File `;
          }
          myTable.appendChild(table);
        },
        {
          once: true,
        }
      );
    }
  };
  tablefunc(excelobj);
};

tableMaker();
