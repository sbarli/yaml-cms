const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {promisify} = require('util');

const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

const readFileFromViews = (viewsPathToFile) => {
  try {
    if (typeof viewsPathToFile !== 'string')
      throw new Error('expected viewsPathToFile to be a string');
    return readFileAsync(
      path.join(__dirname, '../views/', viewsPathToFile),
      'utf-8'
    );
  } catch (e) {
    console.log(
      `ERROR: ${moment()}: reading from views dir in yamlUtil.js: `,
      e
    );
    throw e;
  }
};

const readDirFromViews = (viewsPathToDir) => {
  try {
    if (typeof viewsPathToDir !== 'string')
      throw new Error('expected viewsPathToDir to be a string');
    return readDirAsync(path.join(__dirname, '../views/', viewsPathToDir));
  } catch (e) {
    console.log(
      `ERROR: ${moment()}: reading dir from views dir in yamlUtil.js: `,
      e
    );
    throw e;
  }
};

module.exports = {
  readDirAsync,
  readFileAsync,
  readDirFromViews,
  readFileFromViews,
};