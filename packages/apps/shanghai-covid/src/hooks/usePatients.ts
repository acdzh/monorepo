import { useEffect, useState } from 'react';

import { getPatientsByDateRange } from '../services';
import type { DateRangeType, PatientType } from '../type';

export const usePatients = (
  isMapReady: boolean,
  dateRange: DateRangeType
): [PatientType[], React.Dispatch<React.SetStateAction<PatientType[]>>] => {
  const [innerPatients, setInnerPatients] = useState<PatientType[]>([]);

  const [patients, setPatients] = useState<PatientType[]>([]);
  useEffect(() => {
    console.log(dateRange);
    getPatientsByDateRange(dateRange).then((_patients) => {
      setInnerPatients(_patients);
    });
  }, [dateRange]);

  useEffect(() => {
    if (!isMapReady) return;
    setPatients(innerPatients);
    console.log(`更新数据: ${innerPatients.length} 条.`);
  }, [isMapReady, innerPatients]);

  return [patients, setPatients];
};
