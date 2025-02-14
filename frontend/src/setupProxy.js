// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  // 요청을 백엔드로 프록시
  app.use(
    "/user",
    createProxyMiddleware({
      target: "http://localhost:8080", // 백엔드 서버 주소
      changeOrigin: true,
      secure: false,
    })
  );
};
