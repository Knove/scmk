const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { insertFlg } = require("./tools/string");

function dir(dir, configData) {
  if (dir) {
    configData.url = dir;
    fs.writeFileSync(path.join(__dirname, "../bin/scmk.json"), JSON.stringify(configData));
  } else
    console.log(
      chalk.red("SCMK ERROR : 请填写正确的文件夹路径。")
    );
}

exports = module.exports = dir;
