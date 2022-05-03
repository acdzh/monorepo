import { Modal, Table } from 'antd';
import React, { useMemo } from 'react';

import 区Code36 from '../../../../libs/区Code36';
import type { PatientType } from '../../../type';
import { 各区统计数据类型, 获取各区统计数据 } from '../utils';

const { Column } = Table;

export const 分地区统计Modal: React.FC<{
  patients: PatientType[];
  visible: boolean;
  onClose: () => void;
}> = ({ patients, visible, onClose }) => {
  const 各区统计数据 = useMemo(() => 获取各区统计数据(patients), [patients]);
  return (
    <Modal
      title="分地区统计"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <Table
        dataSource={各区统计数据}
        bordered
        size="small"
        pagination={false}
        scroll={{
          scrollToFirstRowOnChange: true,
          y: '40vh',
        }}
      >
        <Column
          title="地区"
          key="地区"
          dataIndex="地区"
          align="center"
          filters={区Code36.list.map((v) => ({
            text: v,
            value: v,
          }))}
          onFilter={(value, record: 各区统计数据类型) => record.地区 === value}
        />
        <Column
          key="数量"
          title="数量"
          dataIndex="数量"
          align="center"
          defaultSortOrder="descend"
          sorter={(a: 各区统计数据类型, b: 各区统计数据类型) => a.数量 - b.数量}
        />
      </Table>
      <div style={{ marginTop: '10px' }}>
        共计: {patients.length} (此数据不是确诊或无症状感染者数量)
      </div>
    </Modal>
  );
};
