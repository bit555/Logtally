// class contructer that gives unique SET of values from parsed array
const vcidLengthChecker = /\b[a-zA-Z0-9]{4,8}\d{4}\b/;

class UniqueNameSetMain extends Set {
  constructor(values) {
    super(values);

    const names = []; //TODO :change array
    for (let value of this) {
      if (names.includes(value["VC ID"]) || value["VC ID"] === " ") {
        // console.log("value vcid--------------->", typeof value["VC ID"]);
        // console.log(
        //   "value vcid length--------------->",
        //   value.vcid.toString().length
        // );

        this.delete(value);
      } else {
        names.push(value["VC ID"]);
      }
    }
  }
}

class UniqueNameSetLog extends Set {
  constructor(values) {
    super(values);

    const names = []; //TODO :change array
    for (let value of this) {
      if (
        names.includes(value.VCID) ||
        !vcidLengthChecker.test(value.VCID?.toString())
      ) {
        // console.log("value vcid--------------->", typeof value.VCID);
        // console.log(
        //   "value vcid length--------------->",
        //   value.vcid.toString().length
        // );

        this.delete(value);
      } else {
        names.push(value.VCID);
      }
    }
  }
}

const compare = (w1, w2) => {
  let missingValues = [];
  for (let item of w1) {
    let searchValue = w2.find((w2item) => w2item.VCID === item["VC ID"]);
    if (searchValue === undefined) missingValues.push(item);
  }

  return missingValues;
};

module.exports = {
  UniqueNameSetMain,
  UniqueNameSetLog,
  compare,
};
