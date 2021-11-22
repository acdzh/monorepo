const fs = require('fs');
const path = require('path');

const logger = require('log4js').getLogger('darwin/watcher');

const formatToListenBrainzJson = require('./format');

const LOG_PATH = path.join(
  process.env.HOME,
  '/Library/Containers/com.netease.163music/Data/Documents/storage/Logs/music.163.log'
);

let linesCount = fs.readFileSync(LOG_PATH, 'utf8').split('\n').length;
const getHistory = () => {
  const contents = fs.readFileSync(LOG_PATH, 'utf8').split('\n');
  const newContentList = contents.slice(linesCount);
  linesCount = contents.length;
  const history = newContentList
    .filter((log) => log.includes('_$load'))
    .map((log) =>
      JSON.parse(log.slice(log.indexOf('{'), log.lastIndexOf('}') + 1))
    );
  return history;
};

function watch(callback) {
  let timeoutId;
  logger.info('start listening');
  fs.watch(LOG_PATH, () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      logger.info('history file changed');
      const history = getHistory();
      logger.info('get history, length:', history.length);
      if (history.length > 0) {
        logger.debug(history[0]);
        logger.info('callback:', history[0].songName);
        callback(formatToListenBrainzJson(history[0]));
      } else {
        logger.error('no history');
      }
    }, 1000);
  });
}

module.exports = watch;
