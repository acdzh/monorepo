import { Modal, Typography } from 'antd';
import React from 'react';

const { Paragraph, Link } = Typography;

export const 关于Modal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => (
  <Modal title="关于" visible={visible} onOk={onClose} onCancel={onClose}>
    <Paragraph>
      本站不是官方网站, 仅用于交流与学习, 一切信息请以<b>官方口径</b>为准.
    </Paragraph>
    <Paragraph>
      所有数据来自
      <Link
        href="https://wsjkw.sh.gov.cn/xwfb/index.html"
        target="_blank"
        rel="noreferrer"
      >
        上海市卫建委
      </Link>
      公布的疫情相关<b>地点</b>的数据, 不是确诊或无症状病例数据,
      因为每天同一地点的病例在通报中会合并, 所以地址数量会
      <b>远小于</b>病例数量.
    </Paragraph>
    <Paragraph>
      数据每天中午定时更新, 地理坐标为自动生成, 存在误差或偏移等现象,
      属于正常现象. 如果想<b>查询具体的地址是否存在相关风险</b>, 请点击
      <code>所有数据</code>
      按钮, 之后使用
      <code>地址</code>一栏的筛选按钮进行搜索.
    </Paragraph>
    <Paragraph>
      本站不保证数据的及时, 正确性与完整性. 因四月份数据量激增, 页面会有卡顿,
      请耐心等待. 如有问题, 请联系开发者:{' '}
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
      .
    </Paragraph>
    <Paragraph>
      <Link
        href="https://www.zhihu.com/question/368570142/answer/1002837086"
        target="_blank"
      >
        疫情会放大焦虑等负面情绪
      </Link>
      , 希望各位能够调整好心态, 共克时艰. 这个世界虽然不完美,
      但我们仍可以治愈自己. 一切总会过去的, 谢谢大家.
    </Paragraph>
  </Modal>
);
