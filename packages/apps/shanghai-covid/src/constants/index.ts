import moment from 'moment';

import type { DateRangeType } from '../type';

export const defaultDateRanges: Record<string, DateRangeType> = {
  今天: [moment(), moment()],
  昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  前天: [moment().subtract(2, 'days'), moment().subtract(2, 'days')],
  '最近 3 天': [moment().subtract(2, 'days'), moment()],
  '最近 7 天': [moment().subtract(6, 'days'), moment()],
  '最近 14 天': [moment().subtract(13, 'days'), moment()],
  本周: [moment().startOf('weeks'), moment()],
  本月: [moment().startOf('month'), moment()],
};
