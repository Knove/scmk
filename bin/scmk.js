#!/usr/bin/env node

// global package
const chalk = require("chalk");
const path = require("path");

// private package
const logo = require("./logo");
const create = require("../src/create");
const dir = require("../src/dir");

// config data
const script = process.argv[2];
const configData = require(path.join(__dirname, "./scmk.json"));

logo();
switch (script) {
  case "create":
    create(configData.url, process.argv[3], process.argv[4]);
    break;
  case "dir":
    dir(process.argv[3], configData);
    break;
  default:
    console.log(`unkown script ${chalk.cyan(script)}.`);
    break;
}
