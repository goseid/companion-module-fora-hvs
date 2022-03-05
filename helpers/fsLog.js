const getDateString = require("../helpers/getDateString");
const fs = require("fs");
const path = require("path");

module.exports = function (filePrefix, data, message = null) {
  //const d = getDateString();
  var writeFailed = false;
  const fn = `module-local-dev/companion-module-fora-hvs/data/${filePrefix} ${getDateString()}.json`;
  const p = path.dirname(fn);
  //console.log(`mkdirsync(${p})`);
  fs.mkdirSync(
    p,
    {
      recursive: true,
    },
    (err) => {
      console.log(`ERR logError.js-mkdirSync(${p}):`);
      console.log(err);
    }
  );
  let objToLog = {};
  if (message) {
    console.log(message);
    objToLog.message = message;
    objToLog.data = data;
  } else objToLog = data;

  console.log(`writing file: ${fn}`);
  fs.writeFile(fn, JSON.stringify(objToLog, null), function (err) {
    if (err) {
      console.log(`ERROR WRITING ${fn}: ${err}`);
      writeFailed = true;
    }
    if (message && !writeFailed) console.log(`data saved to ${fn}`);
  });
};