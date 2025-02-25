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
  { _id: "0", name: "모두", array: [] },
  { _id: "1", name: "0 - 99", array: [0, 99] },
  { _id: "2", name: "100 - 200원", array: [100, 200] },
  { _id: "3", name: "200 - 300원", array: [200, 300] },
  { _id: "4", name: "300 - 400원", array: [300, 400] },
  { _id: "5", name: "400 - 500원", array: [400, 500] },
  { _id: "6", name: "500 - 99000원", array: [500, 99000] },
  // 원하는 만큼 범위를 추가할 수 있음
];

export { continents, prices };
