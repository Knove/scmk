const chalk = require('chalk');

function SELECT(type) {
  switch (type) {
    case 'scm':
      return `
0    纯净版
0+   带内页纯净版
1    标准外页
2    完整版
2.1  完整版（新增物品为按钮类型）
3    左侧树模块
`;
    case 'smart':
      return `
2    完整版
`;
    default:
      return `

[暂时没有模板]

`;
  }
}
function QUE_M_SELECT() {
  return `
请确认你即将要进行的项目(输入N可以退出)：
直接输入左侧单词继续
${chalk.magenta('——————————————————————————')}
${chalk.blue('scm         供应链前端项目')}
${chalk.blue('smart       云平台前端项目')}
${chalk.yellowBright('scm-java    供应链后端项目')}
${chalk.magenta('——————————————————————————')}
`;
}
function QUE_T_SELECT(name, type) {
  return `
请确认你要创建的模块信息(输入N可以退出)：
模块名：${chalk.bgMagenta(name)}
要创建哪一套模块？
可以去 https://github.com/KnoveZ/scmk 查看各模块特性。
直接输入左侧编号继续
${chalk.magenta('——————————————————————————')}
${SELECT(type)}
${chalk.magenta('——————————————————————————')}
`;
}
exports = module.exports = {
  QUE_M_SELECT,
  QUE_T_SELECT,
};
