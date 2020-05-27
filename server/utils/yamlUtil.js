/* eslint-disable default-case */
const yaml = require('js-yaml');
const moment = require('moment');

const { paths } = require('./constants');
const {
  readFileFromViews,
  readFileFromViewsSync,
} = require('./fsUtil');

const yamlUtil = {
  /**
   * @param {string} pathToFile - relative to the /views directory
   * @param {string} nestedContentPath - relative to the /views directory, if provided, will trigger use of helper function to populate nested content
   */
  getSpecificYaml: async function (pathToFile, nestedContentPath) {
    try {
      const yamlFile = await readFileFromViews(pathToFile);
      const baseContent = yaml.safeLoad(yamlFile);
      if (nestedContentPath) {
        const populatedContent = this.populateNestedContent(
          baseContent,
          nestedContentPath
        );
        return populatedContent;
      }
      return baseContent;
    } catch (e) {
      console.log(
        `ERROR: ${moment()}: yamlUtil.getSpecificYaml: grabbing specific yaml in yamlUtil.js: `,
        e
      );
      throw e;
    }
  },

  /**
   * @name formatFilePath
   * @param {string} typeFolder - either tracks dir, units dir, or subunits dir
   * @param {string} fileFolder - optional, if provided, used between @typeFolder and @fileName
   * @param {string} fileName
   * @param {string} fileType - DEFAULT: 'yaml'
   * @description formats path based on provided params
   * @returns {string} formaatted based on supplied params
   */
  formatFilePath: function (
    typeFolder,
    fileFolder,
    fileName,
    fileType = 'yaml'
  ) {
    let path = '';
    switch (typeFolder) {
      case paths.SUBUNITS_DIR:
        path = `${typeFolder}/${fileFolder}/${fileName}.${fileType}`;
        break;
      default:
        path = `${typeFolder}/${fileName}.${fileType}`;
    }
    return path;
  },

  populateNestedContent: function (data, nestedContentPath) {
    try {
      if (Array.isArray(data)) {
        return data.map((item) => {
          return this.populateNestedContent(item, nestedContentPath);
        });
      } else if (typeof data === 'object' && data !== null) {
        const updatedDataObj = Object.keys(data).reduce((acc, key) => {
          if (key === 'codeblock') {
            const pathToCodeblock = this.formatFilePath(
              nestedContentPath,
              null,
              data[key],
              'txt'
            );
            acc[key] = readFileFromViewsSync(pathToCodeblock);
          } else if (typeof data[key] === 'object' && data[key])
            acc[key] = this.populateNestedContent(data[key], nestedContentPath);
          else acc[key] = data[key];
          return acc;
        }, {});
        return updatedDataObj;
      } else return data;
    } catch (e) {
      console.log(
        `ERROR: ${moment()}: yamlUtil.populateNestedContent: populating nested data in ${nestedContentPath}: `,
        e
      );
      return data;
    }
  },
};

module.exports = yamlUtil;
