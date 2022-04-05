import { Modal, Table } from 'antd';
import React, { useMemo } from 'react';

import type { PatientType } from '../../../libs';
import { 各个日期统计数据类型, 获取各个日期统计数据 } from '../utils';

const { Column } = Table;

export const 按日期统计Modal: React.FC<{
  patients: PatientType[];
  visible: boolean;
  onClose: () => void;
}> = ({ patients, visible, onClose }) => {
  const 各个日期统计数据 = useMemo(
    () => 获取各个日期统计数据(patients),
    [patients]
  );
  return (
    <Modal
      title="按日期统计"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <Table
        dataSource={各个日期统计数据}
        bordered
        size="small"
        pagination={false}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: '40vh',
        }}
      >
        <Column
          title="日期"
          key="日期"
          dataIndex="日期"
          align="center"
          defaultSortOrder="descend"
          sorter={(a: 各个日期统计数据类型, b: 各个日期统计数据类型) =>
            new Date(a.日期).getTime() - new Date(b.日期).getTime()
          }
        />
        <Column
          key="数量"
          title="数量"
          dataIndex="数量"
          align="center"
          sorter={(a: 各个日期统计数据类型, b: 各个日期统计数据类型) =>
            a.数量 - b.数量
          }
        />
      </Table>
      <div style={{ marginTop: '10px' }}>
        共计: {patients.length} (此数据不是确诊或无症状感染者数量)
      </div>
    </Modal>
  );
};
