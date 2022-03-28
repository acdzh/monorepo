const fs = require('fs');
const path = require('path');

const axios = require('axios');

const url =
  'https://zt.changjing.com.cn/map/d3vYDHfujJIkll_WdQ9Hcw/layer_data?layer_id=2120258&type=marker_layer&key=&_=1648438722840';

function bd09_to_gc102(lng, lat) {
  const x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  const x = lng - 0.0065;
  const y = lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);

  const _lng = z * Math.cos(theta);
  const _lat = z * Math.sin(theta);
  return [_lng, _lat];
}

axios
  .get(url, {
    headers: {
      host: 'zt.changjing.com.cn',
      referer:
        'https://zt.changjing.com.cn/map/viewer?mid=d3vYDHfujJIkll_WdQ9Hcw',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
    },
  })
  .then((res) => {
    const data = res.data.layer.markers.map((marker) => {
      const [lng, lat] = bd09_to_gc102(marker.lng, marker.lat);
      const attrs = Object.fromEntries(
        marker.marker_attrs.map((attr) => [attr.key, attr.value])
      );
      return {
        ...attrs,
        lng: lng,
        lat: lat,
        created_at: marker.created_at,
        区: attrs.地址.split('区')[0] + '区',
        累计确诊: 1,
      };
    });
    fs.writeFileSync(
      path.resolve(__dirname, '../data.json'),
      JSON.stringify(data)
    );
  });
