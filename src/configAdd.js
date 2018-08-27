const fs = require("fs");
const chalk = require("chalk");
const path = require("path");
const { insertFlg } = require("./tools/string");

function configAdd(projectUrl, projectName, modelName) {
  // data ready
  const MODEL_LOGO = "//  --- SCMK  ---";
  const MODEL_ANCHOR = "app.use(createLoading());";

  const modelRegistPage = fs
    .readFileSync(projectUrl + "\\src\\entry\\inventory.js")
    .toString();
  const insertModel = `app.model(require('../models/inventory/${modelName}'));\n`;

  const anchorSn = modelRegistPage.indexOf(MODEL_ANCHOR);
  if (anchorSn >= 0) {
    const logoFlag = modelRegistPage.indexOf(MODEL_LOGO);
    const insertContext = insertFlg(
      modelRegistPage,
      MODEL_LOGO + "\n",
      anchorSn + 26
    );
    if (logoFlag < 0) {
      fs.writeFileSync(
        projectUrl + "\\src\\entry\\inventory.js",
        insertContext
      );
    }
    const logoSn = insertContext.indexOf(MODEL_LOGO);
    if (logoSn >= 0) {
      fs.writeFileSync(
        projectUrl + "\\src\\entry\\inventory.js",
        insertFlg(insertContext, insertModel, logoSn + 19)
      );
      console.log(chalk.green("SCMK SUCCESS => 成功注册model"));
    } else
      console.log(chalk.red("SCMK ERROR : 写入文件失败！请检查写入权限！"));
  } else
    console.log(
      chalk.red(
        "SCMK ERROR : entry\\inventory.js 文件不合法，没有找到锚点，无法注册model！"
      )
    );
}

exports = module.exports = configAdd;
