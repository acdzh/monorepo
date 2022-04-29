const fs = require('fs');
const path = require('path');

const axios = require('axios');
const coordtransform = require('coordtransform');
const { groupBy } = require('lodash');

const CSV = require('../libs/CSV');
const DayCode36 = require('../libs/DayCode36');
const 区Code36 = require('../libs/区Code36');

const MID = 'd3vYDHfujJIkll_WdQ9Hcw';
const DETAIL_API = `https://zt.changjing.com.cn/map/details2?mid=${MID}&_=${new Date().getTime()}`;

const headers = {
  host: 'zt.changjing.com.cn',
  referer: `https://zt.changjing.com.cn/map/viewer?mid=${MID}`,
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
};

const bd09_to_gcj102 = (lng, lat) => coordtransform.bd09togcj02(lng, lat);

// 获取所有图层
async function getLayers() {
  console.log(`从 [${DETAIL_API}] 获取所有图层...`);
  const res = await axios.get(DETAIL_API, {
    headers,
  });
  const map = res.data.map;
  console.log('获取所有图层完成, 解析数据.');
  const layers = map.layers.map((layer) => ({
    ...layer,
    api: `https://zt.changjing.com.cn/map/${MID}/layer_data?layer_id=${
      layer.id
    }&type=${layer.type}&key=&_=${new Date().getTime()}`,
  }));
  console.log(`解析图层完成, 获得 [${layers.map((layer) => layer.title)}].`);
  return layers;
}

// 累计病例分布
async function getDataFrom累计病例分布Layer(layer) {
  console.log(`从 [${layer.api}] 获取 [${layer.title}]...`);
  const res = await axios.get(layer.api, {
    headers,
  });
  console.log(`获取 [${layer.title}] 完成, 解析数据.`);
  const data = res.data.layer.markers.map((marker) => {
    const [lng, lat] = bd09_to_gcj102(marker.lng, marker.lat);
    const attrs = Object.fromEntries(
      marker.marker_attrs.map((attr) => [attr.key, attr.value])
    );
    const [区, 地址] = attrs.地址.replace('区', '区|').split('|');
    return {
      // ...attrs,
      SH_ID_36: parseInt(attrs.SH_ID).toString(36),
      区36: 区Code36.codify(区),
      地址,
      lng: lng,
      lat: lat,
      确诊日期36: DayCode36.codify(attrs.确诊日期),
    };
  });
  console.log(`解析 [${layer.title}] 完成, 共有数据 [${data.length}] 条.`);
  return data;
}

(async () => {
  console.log('开始.');
  const layers = await getLayers();
  const 累计病例分布Layers = layers.filter(
    (layer) => layer.title.indexOf('累计病例分布') !== -1
  );
  const 累计病例分布DataPromises = 累计病例分布Layers.map(
    getDataFrom累计病例分布Layer
  );
  const 累计病例分布Data = (await Promise.all(累计病例分布DataPromises)).flat();
  console.log(
    `获取到累计病例分布: [${累计病例分布Data.length}] 条, 拆分各区写入数据.`
  );
  const 按日期分组的累计病例分布 = groupBy(累计病例分布Data, '区36');
  Object.entries(按日期分组的累计病例分布).forEach(([区36, patients]) => {
    const 区 = 区Code36.parse(区36);
    fs.writeFileSync(
      path.resolve(__dirname, `../data/${区36}.json`),
      JSON.stringify(patients)
    );
    const fields = Object.keys(patients[0]).filter((key) => key !== '区36');
    fs.writeFileSync(
      path.resolve(__dirname, `../data/${区36}.csv`),
      CSV.stringify(patients, fields)
    );
    console.log(`[${区}] 写入完成, 共 [${patients.length}]条.`);
  });
  console.log('写入数据完成');
})();
