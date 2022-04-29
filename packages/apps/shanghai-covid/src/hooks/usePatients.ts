import { shuffle } from 'lodash-es';
import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import CSV from '../../libs/CSV';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import DayCode36 from '../../libs/DayCode36';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import 区Code36 from '../../libs/区Code36';
import type { PatientType } from '../type';

export const usePatients = (
  isMapReady: boolean
): [PatientType[], React.Dispatch<React.SetStateAction<PatientType[]>>] => {
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [isHasStart, setHasStart] = useState(false);

  useEffect(() => {
    if (!isMapReady || isHasStart) return;
    setHasStart(true);
    shuffle(区Code36.codeList).forEach((code: string) => {
      const 区 = 区Code36.parse(code);
      fetch(`/data/${code}.csv`)
        .then((res) => res.text())
        .then((csv) => {
          const _patients: PatientType[] = CSV.parse(csv).map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (patient: any) => {
              return {
                SH_ID: parseInt(patient.SH_ID_36, 36),
                地址: patient.地址,
                lng: parseFloat(patient.lng),
                lat: parseFloat(patient.lat),
                确诊日期: DayCode36.parse(patient.确诊日期36),
                区,
              };
            }
          );
          console.log(`获取 [${code}: ${区}] 数据 ${_patients.length} 条.`);
          setPatients((patients) => [...patients, ..._patients]);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: any) => {
          console.error(err);
          console.error(`获取 [${code}: ${区}] 数据失败!`);
        });
    });
  }, [isHasStart, isMapReady]);

  return [patients, setPatients];
};
