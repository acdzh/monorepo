import { Button, Input, Modal, Space, Table } from 'antd';
import React from 'react';

import { 上海各区 } from '../../../constants';
import type { PatientType } from '../../../type';

const { Column } = Table;

export const 所有数据Modal: React.FC<{
  patients: PatientType[];
  visible: boolean;
  onClose: () => void;
}> = ({ patients, visible, onClose }) => {
  return (
    <Modal
      title={
        <Space>
          所有数据
          <Button
            type="primary"
            size="small"
            ghost
            href="/download.html"
            target="_blank"
          >
            原始数据
          </Button>
        </Space>
      }
      visible={visible}
      width="96vw"
      onOk={onClose}
      onCancel={onClose}
    >
      <Table
        dataSource={patients}
        bordered
        size="small"
        scroll={{
          scrollToFirstRowOnChange: true,
          x: '1024px',
          y: '40vh',
        }}
      >
        <Column
          key="SH_ID"
          title="ID"
          dataIndex="SH_ID"
          align="center"
          width="120px"
          defaultSortOrder="descend"
          sorter={(a: PatientType, b: PatientType) =>
            parseInt(a.SH_ID || '') - parseInt(b.SH_ID || '')
          }
        />
        <Column
          title="确诊日期"
          key="确诊日期"
          dataIndex="确诊日期"
          align="center"
          width="120px"
          sorter={(a: PatientType, b: PatientType) =>
            new Date(a.确诊日期).getTime() - new Date(b.确诊日期).getTime()
          }
        />
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
          onFilter={(value, record: PatientType) => record.区 === value}
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
          onFilter={(value, record: PatientType) =>
            record.地址.includes(value as string)
          }
        />
        {/* <Column
          key="年龄"
          title="年龄"
          dataIndex="年龄"
          align="center"
          width="72px"
          sorter={(a: PatientType, b: PatientType) =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (a.年龄 || 0) - (b.年龄 || 0)
          }
        />
        <Column
          title="性别"
          key="性别"
          dataIndex="性别"
          width="72px"
          align="center"
          filters={['女', '男', '无数据'].map((v) => ({
            text: v,
            value: v,
          }))}
          onFilter={(value, record: PatientType) =>
            record.性别 === value || (value === '无数据' && !record.性别)
          }
        />
        <Column
          title="类型"
          key="方法"
          dataIndex="方法"
          align="center"
          width="72px"
          filters={['就诊', '排查', '管控', '转确', '返沪', '无数据'].map(
            (v) => ({
              text: v,
              value: v,
            })
          )}
          onFilter={(value, record: PatientType) =>
            record.方法 === value || (value === '无数据' && !record.方法)
          }
        /> */}
        <Column
          title="lng"
          key="lng"
          dataIndex="lng"
          align="center"
          sorter={(a: PatientType, b: PatientType) => a.lng - b.lng}
        />
        <Column
          title="lat"
          key="lat"
          dataIndex="lat"
          align="center"
          sorter={(a: PatientType, b: PatientType) => a.lat - b.lat}
        />
      </Table>
      <div style={{ marginTop: '10px' }}>
        共计: {patients.length} (此数据不是确诊或无症状感染者数量)
      </div>
    </Modal>
  );
};
