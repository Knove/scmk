#!/usr/bin/env node

// global package
const chalk = require("chalk");

// private package
const logo = require("./logo");
const create = require("../src/create");

// config data
const script = process.argv[2];
const configData = require("./scmk.json");

logo();
console.log(chalk.blue(configData.url));
switch (script) {
  case "create":
    create(configData.url, process.argv[3]);
    break;
  default:
    console.log(`unkown script ${chalk.cyan(script)}.`);
    break;
}
