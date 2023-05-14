const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api/auth/register', // 👈🏽 your API endpoint goes here.
    createProxyMiddleware({
      target: 'https://user-auth-two.onrender.com', // 👈🏽 your API URL goes here.
      changeOrigin: true,
    })
  );
};
