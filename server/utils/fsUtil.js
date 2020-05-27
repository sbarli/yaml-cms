const fs = require('fs');
const path = require('path');
const moment = require('moment');
const {promisify} = require('util');

const PATH_TO_VIEWS = path.join(__dirname, '../../views/');

const readFileAsync = promisify(fs.readFile);
const readDirAsync = promisify(fs.readdir);

const readFileFromViews = (viewsPathToFile) => {
  try {
    if (typeof viewsPathToFile !== 'string')
      throw new Error('expected viewsPathToFile to be a string');
    return readFileAsync(
      path.resolve(PATH_TO_VIEWS, viewsPathToFile),
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

const readFileFromViewsSync = (viewsPathToFile) => {
  try {
    if (typeof viewsPathToFile !== 'string')
      throw new Error('expected viewsPathToFile to be a string');
    return fs.readFileSync(
      path.resolve(PATH_TO_VIEWS, viewsPathToFile),
      'utf-8'
    );
  } catch (e) {
    console.log(
      `ERROR: ${moment()}: synchronously reading from views dir in yamlUtil.js: `,
      e
    );
    throw e;
  }
};

const readDirFromViews = (viewsPathToDir) => {
  try {
    if (typeof viewsPathToDir !== 'string')
      throw new Error('expected viewsPathToDir to be a string');
    return readDirAsync(path.resolve(PATH_TO_VIEWS, viewsPathToDir));
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
  readFileFromViewsSync,
};