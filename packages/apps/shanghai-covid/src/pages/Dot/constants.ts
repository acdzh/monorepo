import type { DotMapConfig } from '@ant-design/maps';
import moment from 'moment';

import type { PatientType } from '../../type';

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

export const mapConfig: Partial<DotMapConfig> = {
  size: 5,
  color: {
    field: '区',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    customTitle: ({ SH_ID }: Partial<PatientType>) => SH_ID!,
    items: ['区', '地址', '确诊日期', '累计确诊', 'lng', 'lat'],
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const datePickerRanges: any = {
  今天: [moment(), moment()],
  昨天: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  前天: [moment().subtract(2, 'days'), moment().subtract(2, 'days')],
  '最近 3 天': [moment().subtract(2, 'days'), moment()],
  '最近 7 天': [moment().subtract(6, 'days'), moment()],
  '最近 14 天': [moment().subtract(13, 'days'), moment()],
  本周: [moment().startOf('weeks'), moment()],
  本月: [moment().startOf('month'), moment()],
};
