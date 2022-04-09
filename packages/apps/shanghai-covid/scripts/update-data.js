const fs = require('fs');
const path = require('path');

const axios = require('axios');
const coordtransform = require('coordtransform');

const MID = 'd3vYDHfujJIkll_WdQ9Hcw';
const DETAIL_API = `https://zt.changjing.com.cn/map/details2?mid=${MID}&_=${new Date().getTime()}`;

const headers = {
  host: 'zt.changjing.com.cn',
  referer: `https://zt.changjing.com.cn/map/viewer?mid=${MID}`,
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
};

const bd09_to_gcj102 = (lng, lat) => coordtransform.bd09togcj02(lng, lat);

function 读取旧数据() {
  console.log('读取旧数据...');
  try {
    const data = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, '../data.json'))
    );
    console.log(`旧数据累计确诊病例共 [${data.length}] 条.`);
  } catch {
    console.log('无旧数据.');
  }
}

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
      ...attrs,
      lng: lng,
      lat: lat,
      created_at: marker.created_at,
      区,
      地址,
      累计确诊: 1,
    };
  });
  console.log(`解析 [${layer.title}] 完成, 共有数据 [${data.length}] 条.`);
  return data;
}

(async () => {
  console.log('开始.');
  读取旧数据();
  const layers = await getLayers();
  const 累计病例分布Layers = layers.filter(
    (layer) => layer.title.indexOf('累计病例分布') !== -1
  );
  const 累计病例分布DataPromises = 累计病例分布Layers.map(
    getDataFrom累计病例分布Layer
  );
  const 累计病例分布Data = (await Promise.all(累计病例分布DataPromises)).flat();
  console.log(`获取到累计病例分布: [${累计病例分布Data.length}] 条, 写入数据.`);
  fs.writeFileSync(
    path.resolve(__dirname, '../data.json'),
    JSON.stringify(累计病例分布Data)
  );
  console.log('写入数据完成');
})();
