import type { Moment } from 'moment';
import moment from 'moment';

import CSV from '../../libs/CSV';
import 区Code36 from '../../libs/区Code36';
import { DateRangeType, PatientType } from '../type';

const isInThreeDays = (date: Moment | Date | number | string): boolean =>
  moment().diff(date, 'days') <= 3;

export const getPatientsByDate = async (
  date: Moment | Date,
  _cache?: RequestCache
): Promise<PatientType[]> => {
  const dateString = moment(date).format('YYYY-MM-DD');
  const path = `/data/${dateString}.csv`;
  const defaultCache = isInThreeDays(date) ? 'no-cache' : 'force-cache';
  const cache = _cache || defaultCache;
  console.log(`开始获取 ${dateString} 的数据, 缓存策略 (${cache})...`);
  try {
    const response = await fetch(path, { cache });
    if (response.status !== 200) {
      console.log(`获取 ${dateString} 的数据失败, ${path} 获取不存在，跳过...`);
      return [];
    }
    const csv = (await response.text()) || '';
    const patients = CSV.parse(csv).map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (patient: any) => {
        return {
          SH_ID: parseInt(patient.SH_ID_36, 36).toString(),
          地址: patient.地址,
          lng: parseFloat(patient.lng),
          lat: parseFloat(patient.lat),
          确诊日期: dateString,
          区: 区Code36.parse(patient.区36),
        };
      }
    );
    console.log(`获取到 ${dateString} 的数据共 ${patients.length} 条.`);
    return patients;
  } catch (err) {
    console.log(`获取 ${dateString} 的数据失败.`, err);
    return [];
  }
};

export const getPatientsByDateRange = async (
  dateRange: DateRangeType
): Promise<PatientType[]> => {
  const today = moment();
  const range =
    !dateRange || !dateRange[0] || !dateRange[1]
      ? [moment('2022-03-06'), today]
      : (dateRange as [Moment, Moment]);
  console.log(
    `开始获取 ${range[0].format('YYYY-MM-DD')} 至 ${range[1].format(
      'YYYY-MM-DD'
    )} 的数据...`
  );
  const patients = (
    await Promise.all(
      new Array(range[1].diff(range[0], 'days') + 1)
        .fill(0)
        .map((_, i) => range[0].clone().add(i, 'days'))
        .map((date) => ({ date, diff: today.diff(date, 'days') }))
        .filter(({ diff }) => diff >= 0)
        .map(({ date, diff }) => ({
          date,
          cache: (diff > 2 ? 'force-cache' : 'no-cache') as RequestCache,
        }))
        .map(({ date, cache }) => getPatientsByDate(date, cache))
    )
  ).flat();
  console.log(
    `获取到 ${range[0].format('YYYY-MM-DD')} 至 ${range[1].format(
      'YYYY-MM-DD'
    )} 的数据共 ${patients.length} 条.`
  );
  return patients;
};
