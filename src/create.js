const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const configAdd = require('./configAdd');
const configAddCp = require('./configAddCp');
const mkdirp = require('mkdirp');

// global
let projectName = '';
let modelName = '';
let projectUrl = '';
let menuName = '';
const menuData = ['0', '1', '2', '3']; // controlled selectable
const complexData = ['2']; // inner page

function create(url, name, reName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = `请确认你要创建的模块信息(输入N可以退出)：\n模块名：${chalk.bgMagenta(
    name,
  )}\n要创建哪一套模块？直接输入数字继续\n0.纯净模块\n1.标准外页模块\n2.完整模块\n3.左侧菜单模块\n`;

  rl.question(chalk.whiteBright(question), (answer) => {
    if (answer === 'N' || answer === 'n') console.log('Bye!');
    else if (menuData.indexOf(answer) >= 0) {
      if (!name) {
        console.log(chalk.red('SCMK ERROR : 请填入项目名称。 语法： scmk create < 项目名称 > <项目菜单名>。 例如 : scmk create helloWorld 你好世界'));
        return null;
      }
      if (!url) {
        console.log(chalk.red('SCMK ERROR : 请配置好项目目录。 语法： scmk dir < 项目目录 >。 例如 : scmk dir D:\\choice\\merchants'));
        return null;
      }
      // data ready
      menuName = reName;
      projectName = name.substring(0, 1).toUpperCase() + name.substring(1, name.length);
      modelName = name.substring(0, 1).toLowerCase() + name.substring(1, name.length);
      projectUrl = url;
      const filePath = path.join(__dirname, `./template/t${answer}/`);
      // start
      fileDisplay(filePath);
      // add config (router add / model register/ menu info add)
      configAdd(projectUrl, projectName, modelName, menuName);
      // if has inner page,  add detail config (router add / model register)
      if (complexData.indexOf(answer) >= 0) configAddCp(projectUrl, projectName, modelName);
    } else {
      console.log(chalk.red('SCMK ERROR : 请输入正确的模块类型！'));
    }
    rl.close();
  });
}
function fileDisplay(filePath) {
  fs.readdir(filePath, (err, files) => {
    if (err) {
      console.warn(err);
    } else {
      files.forEach((filename) => {
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, (eror, stats) => {
          if (eror) {
            console.log(chalk.red('SCMK ERROR : 获取模板文件失败'));
          } else {
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            // js File
            if (isFile && filename.indexOf('.js') >= 0) {
              const fileData = fs.readFileSync(filedir).toString();
              const JsFileData = fileData.replace(/\$1\$/g, projectName).replace(/\$2\$/g, modelName);
              let wpath = '';
              let dir = '';
              switch (filename) {
                case 'filter.js':
                  wpath = `${projectUrl}\\src\\components\\Inventory\\${projectName}\\filter.jsx`;
                  dir = `${projectUrl}\\src\\components\\Inventory\\${projectName}`;
                  break;
                case 'table.js':
                  wpath = `${projectUrl}\\src\\components\\Inventory\\${projectName}\\table.jsx`;
                  dir = `${projectUrl}\\src\\components\\Inventory\\${projectName}`;
                  break;
                case 'models.js':
                  wpath = `${projectUrl}\\src\\models\\inventory\\${modelName}.js`;
                  dir = `${projectUrl}\\src\\models\\inventory`;
                  break;
                case 'routes.js':
                  wpath = `${projectUrl}\\src\\routes\\inventory\\${projectName}.jsx`;
                  dir = `${projectUrl}\\src\\routes\\inventory`;
                  break;
                case 'services.js':
                  wpath = `${projectUrl}\\src\\services\\inventory\\${modelName}.js`;
                  dir = `${projectUrl}\\src\\services\\inventory`;
                  break;
                case 'info.js':
                  wpath = `${projectUrl}\\src\\components\\Inventory\\${projectName}\\details\\info.jsx`;
                  dir = `${projectUrl}\\src\\components\\Inventory\\${projectName}\\details`;
                  break;
                case 'listView.js':
                  wpath = `${projectUrl}\\src\\components\\Inventory\\${projectName}\\details\\listView.jsx`;
                  dir = `${projectUrl}\\src\\components\\Inventory\\${projectName}\\details`;
                  break;
                case 'modelsDetails.js':
                  wpath = `${projectUrl}\\src\\models\\inventory\\${modelName}Details.js`;
                  dir = `${projectUrl}\\src\\models\\inventory`;
                  break;
                case 'servicesDetails.js':
                  wpath = `${projectUrl}\\src\\services\\inventory\\${modelName}Details.js`;
                  dir = `${projectUrl}\\src\\services\\inventory`;
                  break;
                case 'routesDetails.js':
                  wpath = `${projectUrl}\\src\\routes\\inventory\\${projectName}Details.jsx`;
                  dir = `${projectUrl}\\src\\routes\\inventory`;
                  break;
                default:
                  break;
              }
              fs.exists(dir, (exists) => {
                if (exists) {
                  fs.writeFileSync(wpath, JsFileData);
                  console.log(chalk.green(`SCMK SUCCESS => 成功写入${wpath}`));
                } else {
                  mkdirp(dir, () => {
                    fs.writeFileSync(wpath, JsFileData);
                    console.log(chalk.green(`SCMK SUCCESS => 成功写入${wpath}`));
                  });
                }
              });
            }
            if (isDir) {
              fileDisplay(filedir); // 递归
            }
          }
        });
      });
    }
  });
}

exports = module.exports = create;
