const 区2Code = {
  // 市辖区: 0,
  黄浦区: 1,
  // 卢湾区: 3,
  徐汇区: 4,
  长宁区: 5,
  静安区: 6,
  普陀区: 7,
  // 闸北区: 8,
  虹口区: 9,
  杨浦区: 10,
  闵行区: 12,
  宝山区: 13,
  嘉定区: 14,
  浦东新区: 15,
  金山区: 16,
  松江区: 17,
  青浦区: 18,
  // 南汇区: 19,
  奉贤区: 20,
  崇明区: 30,
};

const 区2Code36 = Object.fromEntries(
  Object.entries(区2Code).map(([k, v]) => [k, v.toString(36)])
);

const code362区 = Object.fromEntries(
  Object.entries(区2Code36).map(([k, v]) => [v, k])
);

const 区Code36 = {
  list: Object.keys(区2Code36),
  codeList: Object.values(区2Code36),
  parse: (code36) => code362区[code36] || code36,
  codify: (str) => 区2Code36[str] || str,
};

module.exports = 区Code36;
