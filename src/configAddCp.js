const fs = require('fs');
const chalk = require('chalk');
const { insertFlg } = require('./tools/string');

function configAddCp(projectUrl, projectName, modelName) {
  const MODEL_LOGO = '//  --- SCMK  ---';
  const MODEL_ANCHOR = 'app.use(createLoading());';
  const ROUTE_ANCHOR = 'const routes = [';

  const modelUrl = `${projectUrl}\\src\\entry\\inventory.js`;
  const routeIndexUrl = `${projectUrl}\\src\\routes\\inventory\\index.jsx`;

  /*
    model regist [Details]
  */

  const modelRegistPage = fs.readFileSync(modelUrl).toString();
  const insertModel = `app.model(require('../models/inventory/${modelName}Details'));`;
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
        console.log(chalk.green('SCMK SUCCESS => 成功写入entry/inventory.js注册 model [Details]'));
      } else console.log(chalk.red('SCMK ERROR : 注册model写入文件失败！请检查写入权限！'));
    } else console.log(chalk.red('SCMK ERROR : entry\\inventory.js 文件不合法，没有找到锚点，无法注册model！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的model已经被注册。[Details]`));
  }

  /*
    router regist [Details]
  */

  const routeIndexPage = fs.readFileSync(routeIndexUrl).toString();
  const insertRoute = `
  {
    path: '/stock/${modelName}/detail/:status/:goodsId/:id',
    getComponent(nextState, cb) {
      require.ensure(
        [],
        (require) => {
          cb(null, require('./${projectName}Details.jsx'));
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
      console.log(chalk.green('SCMK SUCCESS => 成功写入routes/inventory/index.jsx增加路由监听[Details]'));
    } else console.log(chalk.red('SCMK ERROR : routes/inventory/index.jsx 文件不合法，没有找到锚点，无法增加路由监听！'));
  } else {
    console.log(chalk.blue(`SCMK INFO : 检测到模块${modelName}的路由监听已经添加。[Details]`));
  }
}

exports = module.exports = configAddCp;
