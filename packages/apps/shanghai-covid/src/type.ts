import type { Moment } from 'moment';

export type PatientType = {
  SH_ID: string | null;
  地址: string;
  区: string;
  // 年龄: string | null;
  // 性别: string | null;
  // 方法: string | null;
  // 编号: string | null;
  确诊日期: string;
  lng: number;
  lat: number;
  // created_at: string;
};

export type DateRangeType = [Moment | null, Moment | null] | null;
