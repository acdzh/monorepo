const fs = require('fs');
const path = require('path');

const logger = require('log4js').getLogger('windows/watcher');

const formatToListenBrainzJson = require('./format');

const HISTROY_PATH = path.join(
  process.env.HOME,
  'AppData\\Local\\Netease\\CloudMusic\\webdata\\file\\history'
);

const getHistory = () => {
  const content = fs.readFileSync(HISTROY_PATH, 'utf8');
  const history = JSON.parse(content);
  return history;
};

function watch(callback) {
  let timeoutId;
  logger.info('start listening');
  fs.watch(HISTROY_PATH, () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      logger.info('history file changed');
      const history = getHistory();
      logger.info('get history, length:', history.length);
      if (history.length > 0) {
        logger.debug(history[0]);
        logger.info('callback:', history[0].track.name);
        callback(formatToListenBrainzJson('last history:', history[0]));
      } else {
        logger.error('no history');
      }
    }, 1000);
  });
}

module.exports = watch;
