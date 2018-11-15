const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const configAdd = require('./configAdd');
const configAddSmart = require('./configAdd.smart');
const configAddScmS = require('./configAdd.scmS');
const configAddCp = require('./configAddCp');
const mkdirp = require('mkdirp');
const { QUE_M_SELECT, QUE_T_SELECT } = require('./question');
// global
let projectName = '';
let modelName = '';
let projectUrl = '';
let menuName = '';
let type = ''; // selected scmk type
const menuData = ['0', '0+', 's0+', '1', '2', '2.1', '3']; // controlled selectable
const complexData = ['2', '2.1', '0+']; // inner page
const yunMenuData = ['scm', 'scm-s', 'smart', 'scm-java']; // controlled selectable
function create(url, name, reName) {
  const r0 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r0.question(chalk.whiteBright(QUE_M_SELECT()), (answer0) => {
    if (answer0 === 'N' || answer0 === 'n') console.log('Bye!');
    else if (yunMenuData.indexOf(answer0) >= 0) {
      r0.close();
      console.log(`选择的项目为${chalk.bgMagenta(answer0)}`);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question(chalk.whiteBright(QUE_T_SELECT(name, answer0)), (answer) => {
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
          type = answer0;
          const filePath = path.join(__dirname, `./template/${answer0}/t${answer}/`);
          // start
          switch (answer0) {
            case 'scm':
              fileDisplay(filePath);
              configAdd(projectUrl, projectName, modelName, menuName); // add config (router add / model register/ menu info add)
              // if has inner page,  add detail config (router add / model register)
              if (complexData.indexOf(answer) >= 0) configAddCp(projectUrl, projectName, modelName);
              break;
            case 'scm-s':
              fileDisplay(filePath);
              configAddScmS(projectUrl, projectName, modelName, menuName); // add config (router add / model register/ menu info add)
              break;
            case 'smart':
              fileDisplay(filePath);
              configAddSmart(projectUrl, projectName, modelName, menuName); // add config (router add / model register/ menu info add)
              break;
            case 'scm-java':
              console.log(chalk.blue('SCMK INFO : 敬请期待！'));
              break;
            default:
              break;
          }
          rl.close();
        } else {
          console.log(chalk.red('SCMK ERROR : 请输入正确的模块类型！'));
          rl.close();
        }
      });
    } else {
      console.log(chalk.red('SCMK ERROR : 请输入正确的项目名称！'));
    }
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
              if (type === 'scm') {
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
              } else if (type === 'smart') {
                switch (filename) {
                  case 'list.jsx':
                    wpath = `${projectUrl}\\src\\components\\System\\${projectName}\\list.jsx`;
                    dir = `${projectUrl}\\src\\components\\System\\${projectName}`;
                    break;
                  case 'modal.jsx':
                    wpath = `${projectUrl}\\src\\components\\System\\${projectName}\\modal.jsx`;
                    dir = `${projectUrl}\\src\\components\\System\\${projectName}`;
                    break;
                  case 'search.jsx':
                    wpath = `${projectUrl}\\src\\components\\System\\${projectName}\\search.jsx`;
                    dir = `${projectUrl}\\src\\components\\System\\${projectName}`;
                    break;
                  case 'models.js':
                    wpath = `${projectUrl}\\src\\models\\system\\${modelName}.js`;
                    dir = `${projectUrl}\\src\\models\\system`;
                    break;
                  case 'routes.js':
                    wpath = `${projectUrl}\\src\\routes\\system\\${projectName}.jsx`;
                    dir = `${projectUrl}\\src\\routes\\system`;
                    break;
                  case 'services.js':
                    wpath = `${projectUrl}\\src\\services\\system\\${modelName}.js`;
                    dir = `${projectUrl}\\src\\services\\system`;
                    break;
                  default:
                    break;
                }
              } else if (type === 'scm-s') {
                switch (filename) {
                  case 'filter.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components\\filter.jsx`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components`;
                    break;
                  case 'table.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components\\table.jsx`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components`;
                    break;
                  case 'models.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\models\\${modelName}.js`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\models`;
                    break;
                  case 'routes.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\${projectName}.jsx`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}`;
                    break;
                  case 'services.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\services\\${modelName}.js`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\services`;
                    break;
                  case 'info.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components\\info.jsx`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components`;
                    break;
                  case 'listView.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components\\listView.jsx`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\components`;
                    break;
                  case 'modelsDetails.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\models\\${modelName}Details.js`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\models`;
                    break;
                  case 'servicesDetails.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\services\\${modelName}Details.js`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\services`;
                    break;
                  case 'routesDetails.js':
                    wpath = `${projectUrl}\\src\\components\\Vehicle\\${projectName}\\${projectName}Details.jsx`;
                    dir = `${projectUrl}\\src\\components\\Vehicle\\${projectName}`;
                    break;
                  default:
                    break;
                }
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
