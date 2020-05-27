const yaml = require('js-yaml');
const moment = require('moment');

const { paths } = require('./constants');
const { readDirFromViews, readFileFromViews } = require('./fsUtil');

const yamlUtil = {
  /**
   * @param {string} pathToFile - relative to the /server/views directory
   */
  getSpecificYaml: async function (pathToFile) {
    try {
      const yamlFile = await readFileFromViews(pathToFile);
      const jsonObj = yaml.safeLoad(yamlFile);
      return jsonObj;
    } catch (e) {
      console.log(
        `ERROR: ${moment()}: yamlUtil.getSpecificYaml: grabbing specific yaml in yamlUtil.js: `,
        e
      );
      throw e;
    }
  },

  /**
   * @name yamlUtil.getAllYamlFromFolder
   * @description reads all files from specified directory, safely loads yaml, and returns as jsonObj
   * @param {string} folderPath - directory relative to the /server/views directory
   */
  getAllYamlFromFolder: async function (folderPath) {
    try {
      const jsonObj = {};
      const files = await readDirFromViews(folderPath);
      files.forEach(async (filename) => {
        jsonObj[filename] = await this.getSpecificYaml(this.formatFilePath(folderPath, filename, filename));
      });
      return jsonObj;
    } catch (e) {
      return console.log(
        `ERROR: ${moment()}: yamlUtil.getAllYamlFromFolder: grabbing all yaml in folder (views/${folderPath}): `,
        e
      );
    }
  },

  /**
   * @name formatFilePath
   * @param {string} typeFolder - either tracks dir, units dir, or subunits dir
   * @param {string} fileFolder - 
   * @param {string} fileName 
   * @param {string} fileType 
   * @description formats path based on provided params
   */
  formatFilePath: function (typeFolder, fileFolder, fileName, fileType = 'yaml') {
    let path = '';
    switch (typeFolder) {
      case paths.TRACKS_DIR:
        path = `${typeFolder}/${fileName}.${fileType}`;
        break;
      case paths.UNITS_DIR:
        path = `${typeFolder}/${fileName}.${fileType}`;
        break;
      case paths.SUBUNITS_DIR:
        path = `${typeFolder}/${fileFolder}/${fileName}.${fileType}`;
        break;
      default:
        throw new Error('invalid typeFolder provided to yamlUtil.formatFilePath');
    }
    return path;
  }
};

module.exports = yamlUtil;

// /**
//  * all yamlUtil methods assume yaml files
//  *  will be nested within /server/views/yaml
//  */
// const yamlUtil = {

//   /**
//    * ======================================================
//    * ======================================================
//    *              GENERAL HELPTER FUNCTIONS
//    * ======================================================
//    * ======================================================
//    */

//   // ES5 in order to use 'this' binding
//   /**
//    * @param {str} viewsPathToFile - filepath to get to specific file starting from the /server/views directory
//    *    ex. if we want 'callbacks.yaml' (found in /server/views/units/),
//    *        we would pass in viewsPathToFile = 'units/callbacks.yaml'
//    */
//   readFromFile: function (viewsPathToFile) {
//     if (typeof viewsPathToFile !== 'string') return;
//     return fs.readFileSync(path.join(__dirname, '../views/', viewsPathToFile), 'utf-8');
//   },

//   // ES5 in order to use 'this' binding
//   /**
//    * @param {str} pathToFile - relative to the /server/views directory
//    */
//   getSpecificYaml: function (pathToFile) {
//     try {
//       let jsonObj = yaml.safeLoad(this.readFromFile(pathToFile));
//       // console.log(jsonObj)
//       return jsonObj;
//     } catch (e) {
//       return console.log(`${moment()}: Error grabbing specific yaml in yamlUtil.js: `, e);
//     }
//   },

//   // ES5 in order to use 'this' binding
//   /**
//    * @name yamlUtil.getAllYamlFromFolder
//    * @description reads all files from specified directory, safely loads yaml, and returns as jsonObj
//    * @param {str} folderPath - directory relative to the /server/views directory
//    */
//   getAllYamlFromFolder: function (folderPath) {
//     try {
//       const jsonObj = {};
//       const files = fs.readdirSync(path.join(__dirname, '../views/', folderPath));
//       files.forEach((filename) => {
//         let yamlContent = yaml.safeLoad(this.readFromFile(folderPath + filename));
//         jsonObj[filename] = yamlContent;
//       });
//       return jsonObj;
//     } catch (e) {
//       return console.log(`${moment()}: yamlUtil.getAllYamlFromFolder: Error grabbing all yaml in folder (views/${folderPath}): `, e);
//     }
//   },

//   /**
//    * @name yamlUtil.populateChallengeData
//    * @description loads yaml for specified challengeId from challengeFolder
//    *              checks for any code and/or test keys and invokes helper
//    *              function to populate those values from other files.
//    *              then invokes replaceCodeBlockContent to recursively check/replace
//    *              any 'codeblock' keys in the yaml
//    * @param {str} challengeFolder folder name where challenge content can be found
//    * @param {str} challengeId id of challenge which should have corresponding folder
//    *                          and yaml file in the challengeFoler directory.
//    * @returns {obj} populated challenge yaml with populated code, test, and codeblock keys
//    */
//   populateChallengeData: function (challengeFolder, challengeId) {
//     try {
//       let challengeYaml = yaml.safeLoad(
//         this.readFromFile(`${challengeFolder}/${challengeId}/${challengeId}.yaml`)
//       );

//       if (challengeYaml.solve.code) challengeYaml.solve.code = this.readFromFile(`${challengeFolder}/${challengeId}/${challengeYaml.solve.code}`);

//       if (challengeYaml.solve.test) challengeYaml.solve.test = this.readFromFile(`${challengeFolder}/${challengeId}/${challengeYaml.solve.test}`);

//       challengeYaml = this.replaceCodeBlockContent(challengeFolder, challengeId, challengeYaml);

//       return challengeYaml;

//     } catch (e) {
//       console.log(`${moment()}: yamlUtil.populateChallengeData: Error: `, e)
//       throw new Error('An error occurred');
//     }
//   },

//   /**
//    * @name yamlUtil.replaceCodeBlockContent
//    * @description recursively traverses yamlObj param to populate any 'codeblock'
//    *              keys with actual content from specified challengeFolder and challengeId
//    * @param {str} challengeFolder folder name where challenge content can be found
//    * @param {str} challengeId id of challenge which should have corresponding folder
//    *                          and yaml file in the challengeFoler directory.
//    * @returns {obj} populated yamlObj with codeblock content
//    */
//   replaceCodeBlockContent: function (challengeFolder, challengeId, yamlObj) {
//     try {
//       // Recursively search yamlObj and replace codeblock elements with code from reading files
//       if (yamlObj.codeblock) {
//         yamlObj.codeblock = this.readFromFile(`${challengeFolder}/${challengeId}/${yamlObj.codeblock}`);
//       }
//       else if (typeof yamlObj === 'object' && yamlObj !== null) {
//         (Array.isArray(yamlObj) ? yamlObj : Object.entries(yamlObj)).forEach((subYamlObj) => {
//           if (typeof subYamlObj === 'object' && subYamlObj !== null) {
//             this.replaceCodeBlockContent(challengeFolder, challengeId, subYamlObj);
//           }
//         });
//       }
//       return yamlObj;
//     } catch (e) {
//       console.log(`${moment()}: yamlUtil.replaceCodeBlockContent: Error: `, e)
//       throw new Error('An error occurred');
//     }
//   },

//   /**
//    * @name yamlUtil.recurseThruYaml
//    * @description recursively traverses data param to populate any yaml keys
//    *              with actual content from 'server/views/groups/{type}' directory
//    * @param {obj} data array or object of data to parse for nested yaml keys
//    * @returns {obj} object of fully parsed yaml content
//    */
//   recurseThruYaml: function (data) {
//     try {
//       /**
//        * @name isYamlKey
//        * @param {string} key
//        * @description helper function to determine if we
//        *              need to parse more yaml content
//        * @returns {boolean}
//        */
//       const isYamlKey = (key) => {
//         switch (key) {
//           case 'articles':
//           case 'tabs':
//           case 'cards':
//           case 'collapses':
//             return `groups/${key}`;
//             break;
//           case 'author':
//             return 'authors';
//             break;
//           default:
//             return false
//         }
//       };
//       // setup populated content obj to eventually be returned
//       const populatedContent = {};
//       if (Array.isArray(data)) return data.map(item => {
//         if (typeof item === 'string') return item;
//         return this.recurseThruYaml(item);
//       });
//       else if (typeof data === 'object' && data !== null) {
//         Object.keys(data).forEach((item, i) => {
//           // load the actual yaml content if key is a yaml key
//           const nestedYamlFolder = isYamlKey(item);
//           if (nestedYamlFolder) {
//             populatedContent[item] = this.recurseThruYaml(
//               yaml.safeLoad(
//                 this.readFromFile(`${nestedYamlFolder}/${data[item]}.yaml`)
//               )[item]
//             );
//           }
//           // otherwise, if it's NOT an object or array, add directly to populatedContent
//           else if (typeof data[item] !== 'object') populatedContent[item] = data[item];
//           // otherwise, it's an object or array, so recurse to check for nested keys
//           else populatedContent[item] = this.recurseThruYaml(data[item]);
//         });
//       }
//       return populatedContent;
//     } catch (e) {
//       console.log(`${moment()}: yamlUtil.recurseThruYaml: Error: `);
//       console.log('data param was: ', data);
//       console.log('ERROR: ', e);
//     }
//   },

//   /**
//    * =================================================================
//    * =================================================================
//    *                      MAIN GET ALL FUNCTION
//    * =================================================================
//    * =================================================================
//    */

//   /**
//    * @name yamlUtil.getAll
//    * @description gets/loads all static yaml content
//    * @returns {obj} of loaded/populated yaml object content for articles,
//    *                sections, and program applications in format:
//    *                  { articleGroups: {}, sections: {} }
//    */
//   getAll: function () {
//     try {
//       const sections = this.getAllSections();
//       const programApplications = this.getAllApplications();
//       const blogPosts = this.getAllBlogPosts();

//       return { sections, programApplications, blogPosts };

//     } catch (e) {
//       console.log(`${moment()}: yamlUtil.getAll: Error: grabbing all Yaml in yamlUtil.js: `, e)
//     }
//   },

// };

// module.exports = yamlUtil;
