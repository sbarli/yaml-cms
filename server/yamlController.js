const yamlUtil = require('./utils/yamlUtil');
const { paths } = require('./utils/constants');

const yamlController = {};

yamlController.getTracksList = async (req, res, next) => {
  try {
    res.locals.trackList = await yamlUtil.getSpecificYaml(paths.TRACKS_LIST);
    return next();
  }
  catch (e) {
    return next({
      error: {
        err: e,
        message: 'An error occurred while getting tracks list yaml'
      },
      message: 'An error occurred',
      status: 400,
      location: 'yamlController.getTracksList',
    });
  }
};

yamlController.getTrack = async (req, res, next) => {
  const { trackName } = req.params;
  try {
    if (!trackName) throw new Error('expected trackName in req.params');
    res.locals.track = await yamlUtil.getSpecificYaml(yamlUtil.formatFilePath(paths.TRACKS_DIR, null, trackName));
    return next();
  }
  catch (e) {
    return next({
      error: {
        err: e,
        message: `An error occurred while getting specific yaml for track ${trackName}`,
      },
      message: 'An error occurred',
      status: 400,
      location: 'yamlController.getTrack',
    });
  }
};

yamlController.getUnit = async (req, res, next) => {
  const { unitName } = req.params;
  try {
    if (!unitName) throw new Error('expected unitName in req.params');
    res.locals.unit = await yamlUtil.getSpecificYaml(yamlUtil.formatFilePath(paths.UNITS_DIR, null, unitName));
    return next();
  }
  catch (e) {
    return next({
      error: {
        err: e,
        message: `An error occurred while getting specific yaml for unit ${unitName}`,
      },
      message: 'An error occurred',
      status: 400,
      location: 'yamlController.getUnit',
    });
  }
};

yamlController.getSubunit = async (req, res, next) => {
  const { subunitName } = req.params;
  try {
    if (!subunitName) throw new Error('expected subunitName in req.params');
    res.locals.subunit = await yamlUtil.getSpecificYaml(yamlUtil.formatFilePath(paths.SUBUNITS_DIR, subunitName, subunitName), `${paths.SUBUNITS_DIR}/${subunitName}/`);
    return next();
  }
  catch (e) {
    return next({
      error: {
        err: e,
        message: `An error occurred while getting specific yaml for subunit ${subunitName}`,
      },
      message: 'An error occurred',
      status: 400,
      location: 'yamlController.getSubunit',
    });
  }
};

module.exports = yamlController;