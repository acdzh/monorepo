/* eslint-disable prettier/prettier */
import React from 'react';
import Valine from 'gatsby-plugin-valine';

const mapToObject = function(_this, func) {
  const obj = {};
  _this.forEach((item, index) => {
    const result = func(item, index) || [];
    obj[result[0]] = result[1];
  });
  return obj;
};

const emojis = {
  QQ: mapToObject(['aini', 'aixin', 'aoman', 'baiyan', 'bangbangtang', 'baojin', 'baoquan', 'bishi', 'bizui', 'cahan', 'caidao', 'chi', 'ciya', 'dabing', 'daku', 'dan', 'deyi', 'doge', 'fadai', 'fanu', 'fendou', 'ganga', 'gouyin', 'guzhang', 'haixiu', 'hanxiao', 'haobang', 'haqian', 'hecai', 'hexie', 'huaixiao', 'jie', 'jingkong', 'jingxi', 'jingya', 'juhua', 'keai', 'kelian', 'koubi', 'ku', 'kuaikule', 'kulou', 'kun', 'lanqiu', 'leiben', 'lenghan', 'liuhan', 'liulei', 'nanguo', 'OK', 'penxue', 'piezui', 'pijiu', 'qiang', 'qiaoda', 'qinqin', 'qiudale', 'quantou', 'saorao', 'se', 'shengli', 'shouqiang', 'shuai', 'shui', 'tiaopi', 'touxiao', 'tu', 'tuosai', 'weiqu', 'weixiao', 'woshou', 'wozuimei', 'wunai', 'xia', 'xiaojiujie', 'xiaoku', 'xiaoyanger', 'xieyanxiao', 'xigua', 'xu', 'yangtuo', 'yinxian', 'yiwen', 'youhengheng', 'youling', 'yun', 'zaijian', 'zhayanjian', 'zhemo', 'zhouma', 'zhuakuang', 'zuohengheng'], name => [`qq_${name}`, `QQ/${name}.gif`]),
  'Tieba-New': mapToObject(['', '10', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '11', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '12', '120', '121', '122', '123', '124', '13', '14', '15', '16', '17', '18', '19', '2', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '3', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '4', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '5', '50', '6', '66', '67', '68', '69', '7', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '8', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '9', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99'], (name) => [`tieba_${name}`, `Tieba-New/image_emoticon${name}.png`]),
  Coolapk: {
    ...mapToObject(['100_qqdoge', '1010', '1011', '1012', '1013', '1014', '1015', '1016', '1017', '1018', '1019', '101_pyjiaoyi', '1020', '1021', '102_fadai', '103_nb', '104', '105', '106', '107', '108', '109', '10_aoman', '11_yiwen', '12_wuyu', '13_huaixiao', '14_bishi', '15_fanu', '16_tuosai', '17_tushe', '18_han', '19_koubi', '1_hahaha', '20_qinqin', '21_penxue', '22_xiaoyan', '23_shui', '24_wuzuixiao', '25_zaijian', '26_kelian', '27_qiang', '28_ruo', '29_baoquan', '2_jingya', '30_ok', '31_xiaoku', '32_heiha', '33_wulian', '34_jizhi', '35_ye', '36_ku', '37_doge', '38_wozuimei', '39_caidao', '3_ciya', '40_aixin', '41_meigui', '42_diaoxie', '43_heixian', '44_pen', '45_yinxian', '46_nanguo', '47_weiqu', '48_weiweiyixiao', '49_huanhu', '4_liulei', '50_xinsui', '51_chigua', '52_hejiu', '53_pu', '54_hongyaowan', '55_lvyaowan', '56_dogexiaoku', '57_dogehechi', '58_dogeyuanliangta', '59_erha', '5_keai', '60_kuan', '61_lvmao', '62_huaji', '63_liuhanhuaji', '64_shounuehuaji', '65_coshuaji', '66_doujiyanhuaji', '67_mojinghuaji', '68', '69', '6_weixiao', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '7_hehe', '80', '81_naikezui', '82_miaomiao', '83_huoba', '84_baiyan', '85', '86', '87', '88', '89', '8_piezui', '90', '91', '92', '93', '94', '95_erhading', '96_kuanlvmao', '97_haixiu', '98_wunai', '99_zhoumei', '9_se'], name => [`coolapk_${name.split('_')[0]}`, `Coolapk/coolapk_emotion_${name}.png`]),
    ...mapToObject(['coolb', 'fived', 'fivef', 'fivem', 'fiveo', 'fivey', 'fy', 'oned', 'onef', 'onem', 'oneo', 'oney', 'oy', 'teny', 'twod', 'twof', 'twom', 'twoo', 'twoy', 'ty'], name => [`coolapk_${name}`, `Coolapk/c_${name}.png`])
  },
  alu: mapToObject(['不出所料', '不说话', '不高兴', '中刀', '中指', '中枪', '亲亲', '便便', '内伤', '击掌', '口水', '吐', '吐舌', '吐血倒地', '呲牙', '咽气', '哭泣', '喜极而泣', '喷水', '喷血', '坐等', '害羞', '小眼睛', '尴尬', '得意', '惊喜', '想一想', '愤怒', '扇耳光', '投降', '抠鼻', '抽烟', '无奈', '无所谓', '无语', '暗地观察', '期待', '欢呼', '汗', '深思', '狂汗', '献花', '献黄瓜', '皱眉', '看不见', '看热闹', '瞅你', '肿包', '脸红', '蜡烛', '装大款', '观察', '赞一个', '邪恶', '锁眉', '长草', '阴暗', '高兴', '黑线', '鼓掌'], (name) => [`alu_${name}`, `alu/${name}.png`]),
  weibo: mapToObject(['d_aoteman', 'd_baibai', 'd_baobao', 'd_beishang', 'd_bingbujiandan', 'd_bishi', 'd_bizui', 'd_chanzui', 'd_chigua', 'd_chijing', 'd_dahaqi', 'd_dalian', 'd_ding', 'd_doge', 'd_erha', 'd_feijie', 'd_feizao', 'd_ganmao', 'd_guile', 'd_guzhang', 'd_haha', 'd_haixiu', 'd_han', 'd_hehe', 'd_heiheihei', 'd_heixian', 'd_heng', 'd_huaixiao', 'd_huaxin', 'd_jiyan', 'd_keai', 'd_kelian', 'd_ku', 'd_kulou', 'd_kun', 'd_landelini', 'd_lang', 'd_lei', 'd_miao', 'd_nanhaier', 'd_nu', 'd_numa', 'd_nvhaier', 'd_qian', 'd_qinqin', 'd_shayan', 'd_shengbing', 'd_shenshou', 'd_shiwang', 'd_shuai', 'd_shuijiao', 'd_sikao', 'd_taikaixin', 'd_tanshou', 'd_tian', 'd_touxiao', 'd_tu', 'd_tuzi', 'd_wabishi', 'd_weiqu', 'd_wu', 'd_xiaoku', 'd_xingxingyan', 'd_xiongmao', 'd_xixi', 'd_xu', 'd_yinxian', 'd_yiwen', 'd_youhengheng', 'd_yun', 'd_yunbei', 'd_zhuakuang', 'd_zhutou', 'd_zuiyou', 'emoji_0x1f31f', 'emoji_0x1f349', 'emoji_0x1f357', 'emoji_0x1f384', 'emoji_0x1f44f', 'emoji_0x1f47b', 'emoji_0x1f47f', 'emoji_0x1f48a', 'emoji_0x1f4a3', 'emoji_0x1f4a9', 'emoji_0x1f631', 'emoji_0x1f643', 'emoji_0x1f645', 'emoji_0x1f648', 'emoji_0x1f649', 'emoji_0x1f64a', 'emoji_0x1f64b', 'emoji_0x1f64f', 'emoji_0x1f913', 'emoji_0x1f917', 'emoji_0x26a1', 'h_buyao', 'h_good', 'h_haha', 'h_jiayou', 'h_lai', 'h_ok', 'h_quantou', 'h_ruo', 'h_woshou', 'h_ye', 'h_zan', 'h_zuoyi'], name => [`weibo_${name}`, `weibo/${name}.png`]),
  lengtu: mapToObject([... new Array(48)], (_, index) => [`lengtu_${index + 1}`, `lengtu/${(index + 1).toString().padStart(2, "0")}.gif`]),
  bilibili_2233: mapToObject(['卖萌', '吃惊', '吐魂', '喝水', '困惑', '大哭', '大笑', '委屈', '怒', '无言', '汗', '疑问', '第一', '耶', '郁闷'], (name) => [`bili_2233_${name}`, `bilibili2233/[2233娘_${name}].png`]),
  bilibili_hotkey: mapToObject([... new Array(32)], (_, index) => [`bili_hotkey_${index + 1}`, `bilibiliHotKey/${(index + 1)}.jpg`]),
  bilibili_tv: mapToObject(['doge', '亲亲', '偷笑', '再见', '冷漠', '发怒', '发财', '可爱', '吐血', '呆', '呕吐', '困', '坏笑', '大佬', '大哭', '委屈', '害羞', '尴尬', '微笑', '思考', '惊吓', '打脸', '抓狂', '抠鼻', '斜眼笑', '无奈', '晕', '流汗', '流泪', '流鼻血', '点赞', '生气', '生病', '疑问', '白眼', '皱眉', '目瞪口呆', '睡着', '笑哭', '腼腆', '色', '调侃', '调皮', '鄙视', '闭嘴', '难过', '馋', '鬼脸', '黑人问号', '鼓掌'], (name) => [`bili_tv_${name}`, `bilibilitv/[tv_${name}].png`]),
  aodamiao: mapToObject([... new Array(40)], (_, index) => [`aodamiao_${index + 1}`, `aodamiao/${(index + 1).toString().padStart(2, "0")}.gif`]),
  //Arcaea: mapToObject([... new Array(40)], (_, index) => [`Arcaea_184064${index + 198}`, `Arcaea/184064${(index + 198).toString().padStart(2, "0")}.png`]),
  //'Convenience-Store-Notes': [... new Array(40)], (_, index) => [`convenience_store_notes_2${index + 1}`, `Convenience-Store-Notes2/${(index + 1).toString().padStart(3, "0")}.png`]),
  'Cute-Emoji': mapToObject([... new Array(40)], (_, index) => [`cute_emoji_${index + 1}`, `Cute-Emoji/${(index + 1).toString().padStart(3, "0")}.png`]),
  //'Snow-Miku': mapToObject([... new Array(40)], (_, index) => [`snow_miku_${index + 66}`, `Snow-Miku/3583${(index + 66).toString().padStart(3, "0")}@2x.png`]),
  //'Sweetie-Bunny': mapToObject([... new Array(40)], (_, index) => [`sweetie_bunny_${index + 78}`, `Sweetie-Bunny/${(index + 12311678).toString().padStart(2, "0")}.png`]),
};

const emojiMaps = Object.assign({}, ...Object.keys(emojis).map(name => emojis[name]));

const Valine_: React.FC = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return (
    <Valine
      emojiCDN="https://cdn.jsdelivr.net/gh/GamerNoTitle/ValineCDN@master/"
      emojiMaps={emojiMaps}
      path={window.location.pathname}
    />
  )
};

export default Valine_;