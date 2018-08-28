const fs = require('fs');
const chalk = require('chalk');
const { insertFlg } = require('./tools/string');

function configAdd(projectUrl, projectName, modelName, menuName) {
  const MODEL_LOGO = '//  --- SCMK  ---';
  const MODEL_ANCHOR = 'app.use(createLoading());';
  const MENU_ANCHOR = 'items: [';
  const ROUTE_ANCHOR = 'const routes = [';

  const modelUrl = `${projectUrl}\\src\\entry\\inventory.js`;
  const menuDataUrl = `${projectUrl}\\src\\components\\common\\Menus\\menuData.js`;
  const routeIndexUrl = `${projectUrl}\\src\\routes\\inventory\\index.jsx`;

  /*
    model regist
  */

  const modelRegistPage = fs.readFileSync(modelUrl).toString();
  const insertModel = `app.model(require('../models/inventory/${modelName}'));`;
  const runFlag = modelRegistPage.indexOf(insertModel);
  if (runFlag < 0) {
    const anchorSn = modelRegistPage.indexOf(MODEL_ANCHOR);
    if (anchorSn >= 0) {
      const logoFlag = modelRegistPage.indexOf(MODEL_LOGO);
      let insertContext = modelRegistPage;
      if (logoFlag < 0) {
        insertContext = insertFlg(modelRegistPage, `\n${MODEL_LOGO}\n`, anchorSn + 26);
        fs.writeFileSync(modelUrl, insertContext);
      }
      const logoSn = insertContext.indexOf(MODEL_LOGO);
      if (logoSn >= 0) {
        fs.writeFileSync(modelUrl, insertFlg(insertContext, `${insertModel}\n`, logoSn + 18));
        console.log(chalk.green('SCMK SUCCESS => 成功写入entry/inventory.js注册model'));
      } else console.log(chalk.red('SCMK ERROR : 注册model写入文件失败！请检查写入权限！'));
    } else console.log(chalk.red('SCMK ERROR : entry\\inventory.js 文件不合法，没有找到锚点，无法注册model！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的model已经被注册。`));
  }

  /*
    menu link add
  */

  const menuDataPage = fs.readFileSync(menuDataUrl).toString();
  const insertMenu = `        { key: '/stock/${modelName}', name: '${menuName}', search: '' },`;
  const runMenuFlag = menuDataPage.indexOf(insertMenu);
  if (runMenuFlag < 0) {
    const menuAnchor = menuDataPage.indexOf(MENU_ANCHOR);
    if (menuAnchor >= 0) {
      fs.writeFileSync(menuDataUrl, insertFlg(menuDataPage, `\n${insertMenu}`, menuAnchor + 9));
      console.log(chalk.green('SCMK SUCCESS => 成功写入menuData.js增加左侧菜单'));
    } else console.log(chalk.red('SCMK ERROR : menuData.js 文件不合法，没有找到锚点，无法增加左侧菜单！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的左侧菜单已经添加。`));
  }

  /*
    router regist
  */

  const routeIndexPage = fs.readFileSync(routeIndexUrl).toString();
  const runRouterFlag = menuDataPage.indexOf(insertMenu);
  if (runRouterFlag < 0) {
    const routeAnchor = routeIndexPage.indexOf(ROUTE_ANCHOR);
    const insertRoute = `
  {
    path: '/stock/${modelName}',
    getComponent(nextState, cb) {
      require.ensure(
        [],
        (require) => {
          cb(null, require('./${projectName}.jsx'));
        },
        '${modelName}',
      );
    },
  },`;
    if (routeAnchor >= 0) {
      fs.writeFileSync(routeIndexUrl, insertFlg(routeIndexPage, insertRoute, routeAnchor + 16));
      console.log(chalk.green('SCMK SUCCESS => 成功写入routes/inventory/index.jsx增加路由监听'));
    } else console.log(chalk.red('SCMK ERROR : routes/inventory/index.jsx 文件不合法，没有找到锚点，无法增加路由监听！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的路由监听已经添加。`));
  }
}

exports = module.exports = configAdd;
