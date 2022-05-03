const day2Code36Cache = new Map();
const code362DayCache = new Map();

const START_DAY = new Date('2022-03-06').getTime();
const A_DAY_MILLISECOND = 1000 * 24 * 3600;

const DayCode36 = {
  parse: (code36) => {
    if (!code36) return '';
    if (code362DayCache.has(code36)) return code362DayCache.get(code36);
    const day = new Date(START_DAY + parseInt(code36, 36) * A_DAY_MILLISECOND)
      .toISOString()
      .slice(0, 10);
    day2Code36Cache.set(day, code36);
    code362DayCache.set(code36, day);
    return day;
  },

  codify: (str) => {
    if (day2Code36Cache.has(str)) return day2Code36Cache.get(str);
    const code36 = parseInt(
      (new Date(str) - START_DAY) / A_DAY_MILLISECOND
    ).toString(36);
    day2Code36Cache.set(str, code36);
    code362DayCache.set(code36, str);
    return code36;
  },
};

module.exports = DayCode36;
