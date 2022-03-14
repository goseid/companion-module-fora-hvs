const fs = require("fs");
const path = require("path");

const BASE_PATH = "module-local-dev/companion-module-fora-hvs/logs/";
const LOG_FILE = ` ${getDateString()}.log`;

module.exports = {
    msg: logMessage,
    obj: logObject,
    tabs: logTabSeparated
}

function logMessage(message, model) {
    console.log("model", model);
    const ds = getDateString();
    const firstColon = message.indexOf(":");
    const msgLabel = firstColon ?
        " " + message.substr(0, firstColon) :
        "";
    // writeFile(`${model}/${ds + msgLabel}.msg`, message);
    fs.appendFileSync(BASE_PATH + model + LOG_FILE, `${ds} ${message}\n`, (err) => {
        console.error("ERROR Appending to log", err.message);
    });
    try {
        const name = message.substr(0, firstColon);
        // if (name.includes("_FADE_LV")) return;
        const fc = message.substr(firstColon+1,1);
console.log("FIRST CHARACTER -------------------------------------------------------->", fc)        ;
        if (fc==="[" || fc==="{") {
            const o = JSON.parse(message.substring(firstColon + 1));
            logObject(name, o, model, ds);
            if (name.includes("SET.SIGNAL_GROUP")) {
                logTabSeparated(name, o, ["no", "sName", "lName"], model, ds);
            }
        }
    } catch (error) {
        return;
    }
}

function logObject(name, object, model, dateString = getDateString()) {
    writeFile(`${model}/${dateString} ${name}.json`, JSON.stringify(object, null, 2));
}

function logTabSeparated(name, array, columns, model, dateString = getDateString()) {

    const delimiter = "\t";
    const text = [
        columns.join(delimiter),
        ...array.sort((a, b) => a.no - b.no)
            .map(obj =>
                columns.reduce(
                    (acc, key) => `${acc}${!acc.length ? '' : delimiter}${!obj[key].toString() ? '' : obj[key]}`,
                    ''
                )
            )
    ].join('\n');
    console.log("TAB SEPARATED:");
    console.log(text);
    writeFile(`${model}/${model} names ${dateString} ${name}.tsv`, text);

}

function writeFile(filename, contents) {
    const fn = BASE_PATH + filename;
    const p = path.dirname(fn);

    // ensure directory structure is in place
    fs.mkdirSync(
        p,
        { recursive: true },
        (err) => {
            if (err)
                console.error(`goLog>writeFile>fs.mkdirSync(${p})`, err);
        }
    );

    // write file
    fs.writeFile(fn, contents, (err) => {
        if (err)
            console.error(`goLog>writeFile>fs.writeFile(${p})`, err);
    });
}

function getDateString(d = new Date()) {
    pad = (num, text = '00') => {
        var norm = Math.floor(Math.abs(num)).toString();
        return text.substr(0, text.length - norm.length) + norm;
    };
    return d.getFullYear() +
        pad(d.getMonth() + 1) +
        pad(d.getDate()) +
        "_" +
        pad(d.getHours()) +
        pad(d.getMinutes()) +
        pad(d.getSeconds()) +
        pad(d.getMilliseconds(), "000");
};

