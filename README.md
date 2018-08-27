# SCMK - 模块快速创建
[![NPM version](https://img.shields.io/npm/v/scmk.svg?style=flat)](https://npmjs.org/package/scmk)
[![NPM downloads](http://img.shields.io/npm/dm/scmk.svg?style=flat)](https://npmjs.org/package/scmk)

---
## 安装

```bash
npm install scmk -g
```
## 使用
### 在 cmd/PowerShell/Shell... ( 管理员模式 )
```javascript
// 配置merchants供应链项目目录
scmk dir D:\choice\merchants
// 增加一个项目，项目名为 <StockKn>,左侧菜单栏名为 <入库管理>
scmk create StockKn 入库管理 
```
## 模块选择
### 0 : 纯净版
#### 一尘不染
+ 只有一个外页
+ 搜索框部分只有一个输入框
+ 只有一个纯净表格
+ model 的 state 里只存储 loading，inputvalue 和 tableList 三个可用变量
### 1 : 标准外页
#### 功能预置
+ 只有一个外页
+ 搜索框部分有下拉框、输入、类型选择、日期选择
+ 表格部分有多选，分页
+ 有右上角功能按钮
+ model 中功能齐全