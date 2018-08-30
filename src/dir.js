const fs = require('fs');
const chalk = require('chalk');
const path = require('path');

function dirSet(dir, configData) {
  if (dir) {
    configData.url = dir;
    fs.writeFileSync(path.join(__dirname, '../bin/scmk.json'), JSON.stringify(configData));
    console.log(chalk.green(`SCMK SUCCESS => 成功更新项目目录 => ${dir}`));
  } else console.log(chalk.red('SCMK ERROR : 请填写正确的文件夹路径。'));
}

exports = module.exports = dirSet;
