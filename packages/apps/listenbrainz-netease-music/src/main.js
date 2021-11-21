require('./logger');

const logger = require('log4js').getLogger('main');

const platform = process.platform;
const watch = require(`./${platform}/watch`);

logger.info('main start');
logger.info('platform:', platform);

watch((data) => {
  logger.debug('receive data:', data);
  logger.info('receive data:', data.track_metadata.track_name);
});
