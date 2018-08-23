const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

// global
let projectName = "";
let modelName = "";
let projectUrl = "";

async function create(url, name) {
  if (!name) {
    console.log(
      chalk.red(
        "SCMK ERROR : 请填入项目名称。 语法： scmk create < 项目名称 >。 例如 : scmk create helloWorld"
      )
    );
    return null;
  }
  if (!url) {
    console.log(
      chalk.red(
        "SCMK ERROR : 请配置好项目目录。 语法： scmk set < 项目目录 >。 例如 : scmk set D:\\choice\\merchants"
      )
    );
    return null;
  }
  // data ready
  projectName =
    name.substring(0, 1).toUpperCase() + name.substring(1, name.length);
  modelName =
    name.substring(0, 1).toLowerCase() + name.substring(1, name.length);
  projectUrl = url;
  const filePath = path.join(__dirname, "./template/t1/");

  // start
  fileDisplay(filePath);
}
function fileDisplay(filePath) {
  fs.readdir(filePath, function(err, files) {
    if (err) {
      console.warn(err);
    } else {
      files.forEach(function(filename) {
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, function(eror, stats) {
          if (eror) {
            console.log(chalk.red("SCMK ERROR : 获取模板文件失败"));
          } else {
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            // js File
            if (isFile && filename.indexOf(".js") >= 0) {
              const fileData = fs.readFileSync(filedir).toString();
              const JsFileData = fileData
                .replace(/\$1\$/g, projectName)
                .replace(/\$2\$/g, modelName);
              let path = "";
              let dir = "";
              switch (filename) {
                case "filter.js":
                  path =
                    projectUrl +
                    "\\src\\components\\Inventory\\" +
                    projectName +
                    "\\filter.jsx";
                  dir =
                    projectUrl + "\\src\\components\\Inventory\\" + projectName;
                  break;
                case "table.js":
                  path =
                    projectUrl +
                    "\\src\\components\\Inventory\\" +
                    projectName +
                    "\\table.jsx";
                  dir =
                    projectUrl + "\\src\\components\\Inventory\\" + projectName;
                  break;
                case "models.js":
                  path =
                    projectUrl +
                    "\\src\\components\\Inventory\\" +
                    projectName +
                    "\\table.jsx";
                  dir =
                    projectUrl + "\\src\\components\\Inventory\\" + projectName;
                  break;
                default:
                  break;
              }
              fs.exists(dir, function(exists) {
                if (exists) {
                  fs.writeFileSync(path, JsFileData);
                  console.log(chalk.green("SCMK SUCCESS => 成功写入" + path));
                } else
                  fs.mkdir(dir, function(err) {
                    if (err) console.error(err);
                    else {
                      fs.writeFileSync(path, JsFileData);
                      console.log(
                        chalk.green("SCMK SUCCESS => 成功写入" + path)
                      );
                    }
                  });
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
