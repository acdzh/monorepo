import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useMemo } from 'react';

import { 上海各区 } from '../../../constants';
import type { PatientType } from '../../../libs';
import { 各个地址统计数据类型, 获取各个地址统计数据 } from '../utils';

const { Column } = Table;

export const 按地址统计Modal: React.FC<{
  patients: PatientType[];
  visible: boolean;
  onClose: () => void;
}> = ({ patients, visible, onClose }) => {
  const 各个地址统计数据 = useMemo(
    () => 获取各个地址统计数据(patients),
    [patients]
  );

  return (
    <Modal
      title="按地址统计"
      visible={visible}
      onOk={onClose}
      onCancel={onClose}
    >
      <Table
        dataSource={各个地址统计数据}
        bordered
        size="small"
        scroll={{
          scrollToFirstRowOnChange: true,

          y: '40vh',
        }}
      >
        <Column
          title="地区"
          key="地区"
          dataIndex="区"
          align="center"
          width="96px"
          filters={上海各区.map((v) => ({
            text: v,
            value: v,
          }))}
          onFilter={(value, record: 各个地址统计数据类型) => record.区 === value}
        />
        <Column
          title="地址"
          key="地址"
          dataIndex="地址"
          filterDropdown={({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
          }) => (
            <div style={{ padding: 8 }}>
              <Input
                placeholder="Search"
                value={selectedKeys[0]}
                onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
                }
                onPressEnter={() => confirm()}
                style={{ marginBottom: 8, display: 'block' }}
              />
              <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {' '}
                <Button
                  onClick={() => {
                    clearFilters && clearFilters();
                    confirm();
                  }}
                  size="small"
                >
                  Reset
                </Button>
                <Button type="primary" onClick={() => confirm()} size="small">
                  Search
                </Button>
              </Space>
            </div>
          )}
          onFilter={(value, record: 各个地址统计数据类型) =>
            record.地址.includes(value as string)
          }
        />
        <Column
          key="数量"
          title="数量"
          dataIndex="数量"
          align="center"
          width="72px"
          defaultSortOrder="descend"
          sorter={(a: 各个地址统计数据类型, b: 各个地址统计数据类型) =>
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
