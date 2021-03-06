import { Modal, Typography } from 'antd';
import React from 'react';

const { Paragraph, Link } = Typography;

export const 关于Modal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => (
  <Modal title="关于" visible={visible} onOk={onClose} onCancel={onClose}>
    <Paragraph>
      本站不是官方网站, 仅用于交流与学习, 一切信息请以<b>官方</b>为准.
      所有数据来自
      <Link
        href="https://wsjkw.sh.gov.cn/xwfb/index.html"
        target="_blank"
        rel="noreferrer"
      >
        上海市卫建委
      </Link>
      公布的疫情相关<b>地点</b>, 不是确诊或无症状病例数据.
      每天同一地点的病例在通报中会合并, 因此地址数量
      <b>不等于</b>病例数量.
    </Paragraph>
    <Paragraph>
      数据每天定时更新, 地理坐标为自动生成, 存在误差或偏移.{' '}
      <b>要查询具体的地址是否存在相关风险</b>, 请点击
      <code>所有数据</code>, 之后使用
      <code>地址</code>栏的筛选按钮进行搜索.
    </Paragraph>
    <Paragraph>
      本站不保证数据的及时性, 正确性与完整性. 数据量较大, 请耐心等待加载. 页面
      <b>默认只展示前七天</b>(包括统计弹窗中的数据), 可以自行选择时间范围.
    </Paragraph>{' '}
    <Paragraph>
      如有问题, 请联系开发者:{' '}
      <Link
        href="https://www.github.com/acdzh"
        target="_blank"
        rel="noreferrer"
      >
        acdzh@github
      </Link>{' '}
      或{' '}
      <Link
        href="mailto:admin@acdzh.com?subject=疫情地图相关问题"
        target="_blank"
        rel="noreferrer"
      >
        email
      </Link>
      . 工作繁忙, 非 Bug 类型反馈不会及时处理.
    </Paragraph>
    <Paragraph>上一次功能更新于 2022 年 4 月 30 日.</Paragraph>
  </Modal>
);
