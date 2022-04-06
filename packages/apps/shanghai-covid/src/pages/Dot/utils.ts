import { groupBy } from 'lodash-es';
import moment, { Moment } from 'moment';

import { PatientType } from '../../libs';

export const 统计数量并添加扰动 = (patients: PatientType[]): PatientType[] => {
  const 地址Counter = new Map<string, number>();
  const newPatients = patients.map((patient) => {
    const count = 地址Counter.get(patient.地址) || 0;
    地址Counter.set(patient.地址, count + 1);
    return {
      ...patient,
      ...(count === 0
        ? {}
        : {
            lng: patient.lng + (Math.random() * 2 - 1) * 0.0004,
            lat: patient.lat + (Math.random() * 2 - 1) * 0.0004,
          }),
    };
  });
  newPatients.forEach((patient) => {
    patient.累计确诊 = 地址Counter.get(patient.地址) || 1;
  });

  return newPatients;
};

export const 根据日期筛选数据 = (
  patients: PatientType[],
  dates: [Moment | null, Moment | null] | null
): PatientType[] => {
  if (!dates) return patients;

  const [start, end] = dates;
  if (!start || !end) return patients;
  const newPatients = patients.filter(
    ({ 确诊日期 }) =>
      确诊日期 && moment(确诊日期).isBetween(start, end, 'days', '[]')
  );
  return newPatients;
};

export type 各区统计数据类型 = {
  key: string;
  地区: string;
  数量: number;
};
export const 获取各区统计数据 = (patients: PatientType[]): 各区统计数据类型[] =>
  Object.entries(groupBy<PatientType>(patients, '区')).map(([key, value]) => ({
    key,
    地区: key,
    数量: value.length,
  }));

export type 各个日期统计数据类型 = {
  key: string;
  日期: string;
  数量: number;
};
export const 获取各个日期统计数据 = (
  patients: PatientType[]
): 各个日期统计数据类型[] =>
  Object.entries(groupBy<PatientType>(patients, '确诊日期')).map(
    ([key, value]) => ({
      key,
      日期: key,
      数量: value.length,
    })
  );

export type 各个地址统计数据类型 = {
  key: string;
  地址: string;
  数量: number;
  区: string;
};
export const 获取各个地址统计数据 = (
  patients: PatientType[]
): 各个地址统计数据类型[] =>
  Object.entries(groupBy<PatientType>(patients, '地址')).map(
    ([key, value]) => ({
      key,
      地址: key,
      区: value[0].区 || '',
      数量: value.length,
    })
  );
