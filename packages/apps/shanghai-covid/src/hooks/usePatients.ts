import { message } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';

import { getPatientsByDateRange } from '../services';
import type { DateRangeType, PatientType } from '../type';

const formatDateRange = (dateRange: DateRangeType): string => {
  const range =
    !dateRange || !dateRange[0] || !dateRange[1]
      ? [moment('2022-03-06'), moment()]
      : (dateRange as [Moment, Moment]);
  return `${range[0].format('YYYY-MM-DD')} 至 ${range[1].format('YYYY-MM-DD')}`;
};

export const usePatients = (
  isMapReady: boolean,
  dateRange: DateRangeType
): [PatientType[], React.Dispatch<React.SetStateAction<PatientType[]>>] => {
  const [innerPatients, setInnerPatients] = useState<PatientType[]>([]);

  const [patients, setPatients] = useState<PatientType[]>([]);
  useEffect(() => {
    const dateRangeStr = formatDateRange(dateRange);
    console.log(dateRange);
    message.loading({
      content: `开始获取 ${dateRangeStr} 的数据...`,
      key: 'usePatients-get-data',
    });
    getPatientsByDateRange(dateRange)
      .then((_patients) => {
        setInnerPatients(_patients);
        message.success({
          content: `获取到 ${dateRangeStr} 的数据共 ${_patients.length} 条.`,
          key: 'usePatients-get-data',
        });
      })
      .catch((err) => {
        console.log(err);
        message.error({
          content: `获取 ${dateRangeStr} 的数据失败.`,
          key: 'usePatients-get-data',
        });
      });
  }, [dateRange]);

  useEffect(() => {
    if (!isMapReady) return;
    setPatients(innerPatients);
    message.info(`地图数据更新: ${innerPatients.length} 条.`);
    console.log(`更新数据: ${innerPatients.length} 条.`);
  }, [isMapReady, innerPatients]);

  return [patients, setPatients];
};
