// filterData.js

const continents = [
  { _id: "1", name: "Asia" },
  { _id: "2", name: "Europe" },
  { _id: "3", name: "Africa" },
  { _id: "4", name: "North America" },
  { _id: "5", name: "South America" },
  { _id: "6", name: "Australia" },
  { _id: "7", name: "Antarctica" },
];

const prices = [
  { _id: "1", name: "0 - 100원", min: 0, max: 100 },
  { _id: "2", name: "100 - 200원", min: 100, max: 200 },
  { _id: "3", name: "200 - 300원", min: 200, max: 300 },
  { _id: "4", name: "300 - 400원", min: 300, max: 400 },
  { _id: "5", name: "400 - 500원", min: 400, max: 500 },
  { _id: "6", name: "500 - 600원", min: 500, max: 600 },
  { _id: "7", name: "600 - 700원", min: 600, max: 700 },
  { _id: "8", name: "700 - 800원", min: 700, max: 800 },
  { _id: "9", name: "800 - 900원", min: 800, max: 900 },
  { _id: "10", name: "900 - 1000원", min: 900, max: 1000 },
  { _id: "11", name: "1000 - 1100원", min: 1000, max: 999999 },
  // 원하는 만큼 범위를 추가할 수 있음
];

export { continents, prices };
