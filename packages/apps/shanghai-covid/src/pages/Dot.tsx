import { DotMap, DotMapConfig } from '@ant-design/maps';
import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';

import { PatientType, patients } from '../libs/patients';

const { RangePicker } = DatePicker;

const COLOR_MAP = {
  浦东新区: '#fa2807',
  闵行区: '#fb6c05',
  徐汇区: '#f177d5',
  嘉定区: '#eaafdc',
  静安区: '#614ba6',
  黄浦区: '#3458a1',
  宝山区: '#c0fc8b',
  普陀区: '#3fb1a1',
  虹口区: '#ecaa30',
  金山区: '#3770bb',
  松江区: '#eef9fb',
  奉贤区: '#ded2ed',
  崇明区: '#b2c2e8',
  青浦区: '#61bf81',
  杨浦区: '#6c8dfb',
  长宁区: '#4fed77',
} as {
  [key: string]: string;
};

const config: Partial<DotMapConfig> = {
  map: {
    type: 'amap',
    center: [121.5, 31.15],
    pitch: 15,
    style: 'dark',
    zoom: 10,
  },
  size: 5,
  color: {
    field: '区',
    value: ({ 区 }: Partial<PatientType>) => COLOR_MAP[区!] || '#fff',
  },
  style: {
    opacity: 0.8,
    strokeWidth: 0,
  },
  state: {
    active: {
      color: '#FFF684',
    },
  },
  label: {
    visible: false,
    field: '地址',
    style: {
      fill: '#fff',
      fontSize: 12,
      textAnchor: 'top',
      textOffset: [0, 20],
      padding: [10, 10],
    },
  },
  tooltip: {
    customTitle: ({ SH_ID }: Partial<PatientType>) => SH_ID!,
    items: [
      '地址',
      '年龄',
      '性别',
      '方法',
      '确诊日期',
      '编号',
      '累计确诊',
      'lng',
      'lat',
    ],
  },
  scale: {
    position: 'bottomleft',
  },
  zoom: {
    position: 'bottomright',
  },
  layerMenu: {
    position: 'topright',
  },
};

const ranges = {
  今天: [moment(), moment()],
  昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  前天: [moment().subtract(2, 'days'), moment().subtract(2, 'days')],
  '最近 3 天': [moment().subtract(2, 'days'), moment()],
  '最近 7 天': [moment().subtract(6, 'days'), moment()],
  '最近 14 天': [moment().subtract(13, 'days'), moment()],
  本周: [moment().startOf('weeks'), moment()],
  本月: [moment().startOf('month'), moment()],
};

const 统计数量并添加扰动 = (patients: PatientType[]): PatientType[] => {
  const 地址Counter = new Map<string, number>();
  patients.forEach((patient) => {
    地址Counter.set(patient.地址, (地址Counter.get(patient.地址) || 0) + 1);
  });
  return patients.map((patient) => ({
    ...patient,
    扰动: Math.random() * 0.1,
    lng: patient.lng + (Math.random() * 2 - 1) * 0.0002,
    lat: patient.lat + (Math.random() * 2 - 1) * 0.0002,
    累计确诊: 地址Counter.get(patient.地址) || 1,
  }));
};

const Dot: React.FC = () => {
  const [currentPatients, setCurrentPatients] = useState<PatientType[]>(
    统计数量并添加扰动(patients)
  );

  const onRangeChange = (dates: [Moment | null, Moment | null] | null) => {
    if (!dates) return;

    const [start, end] = dates;
    if (!start || !end) return;
    const newPatients = 统计数量并添加扰动(
      patients.filter(
        ({ 确诊日期 }) =>
          确诊日期 && moment(确诊日期).isBetween(start, end, 'days', '[]')
      )
    );
    setCurrentPatients(newPatients);
  };

  return (
    <>
      <DotMap
        {...config}
        source={{
          data: currentPatients,
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        }}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: 1000,
          top: '10px',
          left: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <RangePicker
          onChange={onRangeChange}
          ranges={ranges as any}
          style={{
            height: '30px',
          }}
        />
        <div style={{ flexShrink: 0 }}>
          <a href="/data.json" style={{ padding: '10px', marginRight: '40px' }}>
            原始数据
          </a>
        </div>
      </div>
    </>
  );
};

export default Dot;
