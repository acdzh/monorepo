import { Modal, Typography } from 'antd';
import React from 'react';

const { Paragraph, Link } = Typography;

export const 关于Modal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => (
  <Modal title="关于" visible={visible} onOk={onClose} onCancel={onClose}>
    <Paragraph>
      本站不是官方网站, 仅用于交流与学习. 所有数据来自
      <Link
        href="https://wsjkw.sh.gov.cn/xwfb/index.html"
        target="_blank"
        rel="noreferrer"
      >
        上海市卫建委
      </Link>
      . 网站更新日期可看页面标题.
    </Paragraph>
    <Paragraph>
      地理坐标为自动生成, 存在误差或偏移等现象, 属于正常现象.
      本站不保证数据的及时, 正确性与完整性.
    </Paragraph>
    <Paragraph>
      如果想查询具体的地址, 请点击<code>全部数据</code>按钮, 之后使用
      <code>地址</code>一栏的筛选按钮.
    </Paragraph>
    <Paragraph>
      如有问题, 请联系开发者:{' '}
      <Link
        href="https://www.github.com/acdzh"
        target="_blank"
        rel="noreferrer"
      >
        acdzh@Github
      </Link>
      ,{' '}
      <Link
        href="mailto:admin@acdzh.com?subject=疫情地图相关问题"
        target="_blank"
        rel="noreferrer"
      >
        email
      </Link>
    </Paragraph>
  </Modal>
);
