const fs = require('fs');
const chalk = require('chalk');
const { insertFlg } = require('./tools/string');

function configAdd(projectUrl, projectName, modelName, menuName) {
  // const MODEL_LOGO = '//  --- SCMK  ---';
  // const MODEL_ANCHOR = 'app.use(createLoading());';
  const MENU_ANCHOR = 'items: [';
  const ROUTE_ANCHOR = 'const routes = [';

  // const modelUrl = `${projectUrl}\\src\\entry\\inventory.js`;
  const menuDataUrl = `${projectUrl}\\src\\components\\common\\Menus\\menuData.js`;
  const routeIndexUrl = `${projectUrl}\\src\\routes\\inventory\\index.jsx`;

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
  const insertRoute = `
    {
      path: '/stock/${modelName}',
      getComponent(nextState, cb) {
        require.ensure(
          [],
          (require) => {
            registerModel(app, require('./../../components/Inventory/${projectName}/models/${modelName}'));
            cb(null, require('./../../components/Inventory/${projectName}/${projectName}.jsx'));
          },
          '${projectName}',
        );
      },
    },
    {
      path: '/stock/${modelName}/detail/:status/:goodsId/:id',
      getComponent(nextState, cb) {
        require.ensure(
          [],
          (require) => {
            registerModel(app, require('./../../components/Inventory/${projectName}/models/${modelName}Details'));
            cb(null, require('./../../components/Inventory/${projectName}/${projectName}Details.jsx'));
          },
          '${projectName}Details',
        );
      },
    },`;
  const runRouterFlag = routeIndexPage.indexOf(insertRoute);
  if (runRouterFlag < 0) {
    const routeAnchor = routeIndexPage.indexOf(ROUTE_ANCHOR);
    if (routeAnchor >= 0) {
      fs.writeFileSync(routeIndexUrl, insertFlg(routeIndexPage, insertRoute, routeAnchor + 16));
      console.log(chalk.green('SCMK SUCCESS => 成功增加路由监听'));
    } else console.log(chalk.red('SCMK ERROR : routes/inventory/index.jsx 文件不合法，没有找到锚点，无法增加路由监听！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的路由监听已经添加。`));
  }
}

exports = module.exports = configAdd;
