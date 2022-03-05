module.exports = function (d = new Date(), format = 0) {
    pad = function (num, character = '0') {
      var norm = Math.floor(Math.abs(num));
      return (norm < 10 ? character : "") + norm;
    };
    var hrd = "";
    if (format.toLowerCase == "pretty") {
      hrd = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
        ` ${pad(d.getHours()," ")}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    } else {
      hrd =
        d.getFullYear() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        "_" +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds());
      if (format == 0) {
        hrd +=
          "000".substr(0, 3 - d.getMilliseconds().length) +
          d.getMilliseconds() + ` r${Math.floor(Math.random() * 100)}`;
      }
    }
    // ' +
    // "000".substr(0, 3 - d.getMilliseconds().length) +
    // d.getMilliseconds();
    return hrd;
  };