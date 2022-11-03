#!/usr/bin/env node
/* eslint-disable */

const fs = require('fs');
const { join } = require('path');
let childProcess = require('child_process');
const command = function (name) {
  return `protoc -I=${process.cwd()}/template ${process.cwd()}/${name} --js_out=import_style=commonjs:${process.cwd()}/js --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${process.cwd()}/js`;
};

function getJsonFiles(jsonPath) {
  const jsonFiles = [];
  function findJsonFile(path) {
    const files = fs.readdirSync(path);
    files.forEach((item, index) => {
      const fPath = join(path, item);
      const stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true) {
        jsonFiles.push(command(fPath));
        childProcess.exec(command(fPath));
      }
    });
  }

  findJsonFile(jsonPath);
  console.log(jsonFiles);
}

getJsonFiles('./template');
