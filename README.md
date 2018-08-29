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
## 特性
+ 无Eslint错误，可以创建后直接上传git
+ 纯净版和标准版自由选择
+ 模块将随时更新
+ 易于重置，只需要重新输入一遍命令，直接初始化，无重复错误
## 模块选择
### 0 : 纯净版
#### 一尘不染
+ 只有一个外页
+ 搜索框部分只有一个输入框
+ 只有一个纯净表格
+ model 的 state 里只存储三个可用变量
### 1 : 标准外页
#### 功能预置
+ 只有一个外页
+ 搜索框部分有下拉框（带模糊搜索）、输入、类型选择、日期选择
+ 表格部分有多选，分页
+ 有右上角功能按钮
+ model 中功能齐全
### 2 : 完整版
#### 功能齐全
+ 外页内页齐全
+ 外页为标准外页的全部配置
+ 内页有可编辑表格，并自带了其所有功能，包括新增、编辑、查看
+ 内页自带提交、保存等按钮功能。并预先写好接口
+ model 中所有功能齐全，detail齐全
### 3 : 左侧树模块
#### 功能预置
+ 只有一个外页
+ 搜索框部分有下拉框、输入框、左侧树筛选
+ 表格部分有多选，分页
+ 有右上角功能按钮
+ model 中功能齐全