const fs = require('fs');
const chalk = require('chalk');
const { insertFlg } = require('./tools/string');

function configAdd(projectUrl, projectName, modelName, menuName) {
  const MODEL_LOGO = '//  --- SCMK  ---';
  const MODEL_ANCHOR = 'app.model(require(\'../models/app\'));';
  // const MENU_ANCHOR = 'items: [';
  const ROUTE_ANCHOR = '// 系统路由';
  const ROUTE_ANCHOR1 = '// 基础系统';

  const modelUrl = `${projectUrl}\\src\\entry\\index.js`;
  // const menuDataUrl = `${projectUrl}\\src\\components\\common\\Menus\\menuData.js`;
  const routeIndexUrl = `${projectUrl}\\src\\routes\\index.jsx`;

  /*
    model regist
  */

  const modelRegistPage = fs.readFileSync(modelUrl).toString();
  const insertModel = `app.model(require('../models/system/${modelName}'));`;
  const runFlag = modelRegistPage.indexOf(insertModel);
  if (runFlag < 0) {
    const anchorSn = modelRegistPage.indexOf(MODEL_ANCHOR);
    if (anchorSn >= 0) {
      const logoFlag = modelRegistPage.indexOf(MODEL_LOGO);
      let insertContext = modelRegistPage;
      if (logoFlag < 0) {
        insertContext = insertFlg(modelRegistPage, `\n${MODEL_LOGO}\n`, anchorSn + 37);
        fs.writeFileSync(modelUrl, insertContext);
      }
      const logoSn = insertContext.indexOf(MODEL_LOGO);
      if (logoSn >= 0) {
        fs.writeFileSync(modelUrl, insertFlg(insertContext, `${insertModel}\n`, logoSn + 18));
        console.log(chalk.green('SCMK SUCCESS => 成功写入entry/index.js注册model'));
      } else console.log(chalk.red('SCMK ERROR : 注册model写入文件失败！请检查写入权限！'));
    } else console.log(chalk.red('SCMK ERROR : entry\\index.js 文件不合法，没有找到锚点，无法注册model！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的model已经被注册。`));
  }
  /*
    router regist
  */

  const routeIndexPage = fs.readFileSync(routeIndexUrl).toString();
  const insertRoute = `import ${projectName} from './system/${projectName}';`;
  const runRouterFlag = routeIndexPage.indexOf(insertRoute);
  if (runRouterFlag < 0) {
    const routeAnchor = routeIndexPage.indexOf(ROUTE_ANCHOR);
    if (routeAnchor >= 0) {
      fs.writeFileSync(routeIndexUrl, insertFlg(routeIndexPage, insertRoute, routeAnchor + 8));
      console.log(chalk.green('SCMK SUCCESS => 成功写入routes/index.jsx增加路由监听导入[STEP1]'));
    } else console.log(chalk.red('SCMK ERROR : routes/index.jsx 文件不合法，没有找到锚点，无法增加路由监听！[STEP1]'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的路由监听已经添加导入。[STEP1]`));
  }
  const routeIndexPage1 = fs.readFileSync(routeIndexUrl).toString();
  const insertRoute1 = `  {
    path: '/system/cloud/${modelName}',
    component: ${projectName},
  },`;
  const runRouterFlag1 = routeIndexPage1.indexOf(insertRoute1);
  if (runRouterFlag1 < 0) {
    const routeAnchor = routeIndexPage1.indexOf(ROUTE_ANCHOR1);
    if (routeAnchor >= 0) {
      fs.writeFileSync(routeIndexUrl, insertFlg(routeIndexPage1, insertRoute1, routeAnchor + 8));
      console.log(chalk.green('SCMK SUCCESS => 成功写入routes/index.jsx增加路由监听实现[STEP2]'));
    } else console.log(chalk.red('SCMK ERROR : routes/index.jsx 文件不合法，没有找到锚点，无法增加路由监听！[STEP2]'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的路由监听已经添加实现。[STEP2]`));
  }
}

exports = module.exports = configAdd;
