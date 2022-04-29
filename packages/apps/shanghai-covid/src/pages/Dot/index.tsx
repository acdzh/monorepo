import { DotMap } from '@ant-design/maps';
import { Button, DatePicker, Space } from 'antd';
import type { Moment } from 'moment';
import React, { useEffect, useState } from 'react';

import { useLocation } from '../../hooks';
import { usePatients } from '../../hooks/usePatients';
import type { PatientType } from '../../type';

import {
  关于Modal,
  分地区统计Modal,
  所有数据Modal,
  按地址统计Modal,
  按日期统计Modal,
} from './components';
import { datePickerRanges, mapConfig } from './constants';
import { 根据日期筛选数据, 统计数量并添加扰动 } from './utils';

const { RangePicker } = DatePicker;

const Dot: React.FC = () => {
  const [is分地区统计ModalVisible, setIs分地区统计ModalVisible] =
    useState(false);
  const [is按日期统计ModalVisible, setIs按日期统计ModalVisible] =
    useState(false);
  const [is按地址统计ModalVisible, setIs按地址统计ModalVisible] =
    useState(false);
  const [is所有数据ModalVisible, setIs所有数据ModalVisible] = useState(false);
  const [is关于ModalVisible, setIs关于ModalVisible] = useState(true);

  const [isMapReady, setIsMapReady] = useState(false);

  const [location] = useLocation();

  const [patients] = usePatients(isMapReady);
  const [currentPatients, setCurrentPatients] = useState<PatientType[]>([]);

  const [dateRange, setDateRange] = useState<
    [Moment | null, Moment | null] | null
  >(datePickerRanges['最近 3 天']);

  useEffect(() => {
    const 根据日期筛选后的数据 = 根据日期筛选数据(patients, dateRange);
    const 扰动后的数据 = 统计数量并添加扰动(根据日期筛选后的数据);
    console.log(
      `更新数据: 共 ${patients.length} 条, 展示其中 ${扰动后的数据.length} 条.`
    );
    setCurrentPatients(扰动后的数据);
  }, [patients, dateRange]);

  return (
    <>
      <DotMap
        {...mapConfig}
        map={{
          type: 'amap',
          center: location,
          pitch: 15,
          style: 'dark',
          zoom: 10,
        }}
        source={{
          data: currentPatients,
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        }}
        onReady={() => setIsMapReady(true)}
      />
      <div
        style={{
          position: 'fixed',
          zIndex: 900,
          top: '10px',
          left: '10px',
          right: '10px',
        }}
      >
        <div>
          <RangePicker
            onChange={(dates) => setDateRange(dates)}
            value={dateRange}
            ranges={datePickerRanges}
            style={{
              height: '30px',
              marginRight: '48px',
            }}
          />
        </div>
        <div style={{ marginTop: '8px' }}>
          <Space>
            <Button type="primary" size="small" ghost>
              分类统计
            </Button>
            <Button
              type="primary"
              size="small"
              ghost
              onClick={() => setIs分地区统计ModalVisible(true)}
            >
              地区
            </Button>
            <Button
              type="primary"
              size="small"
              ghost
              onClick={() => setIs按日期统计ModalVisible(true)}
            >
              日期
            </Button>
            <Button
              type="primary"
              size="small"
              ghost
              onClick={() => setIs按地址统计ModalVisible(true)}
            >
              地址
            </Button>
          </Space>
        </div>
        <div style={{ marginTop: '8px' }}>
          <Space>
            <Button
              type="primary"
              size="small"
              ghost
              onClick={() => setIs所有数据ModalVisible(true)}
            >
              所有数据
            </Button>
            <Button
              type="primary"
              size="small"
              ghost
              onClick={() => setIs关于ModalVisible(true)}
            >
              关于
            </Button>
          </Space>
        </div>
      </div>
      <分地区统计Modal
        patients={currentPatients}
        visible={is分地区统计ModalVisible}
        onClose={() => setIs分地区统计ModalVisible(false)}
      />
      <按日期统计Modal
        patients={currentPatients}
        visible={is按日期统计ModalVisible}
        onClose={() => setIs按日期统计ModalVisible(false)}
      />
      <按地址统计Modal
        patients={currentPatients}
        visible={is按地址统计ModalVisible}
        onClose={() => setIs按地址统计ModalVisible(false)}
      />
      <所有数据Modal
        patients={currentPatients}
        visible={is所有数据ModalVisible}
        onClose={() => setIs所有数据ModalVisible(false)}
      />
      <关于Modal
        visible={is关于ModalVisible}
        onClose={() => setIs关于ModalVisible(false)}
      />
    </>
  );
};

export default Dot;
