const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
    createProxyMiddleware(['/auth','/tweets']), {
            target: 'http://internal-back-tier-alb-1945782263.ap-northeast-2.elb.amazonaws.com', //접속하려는 서버의 루트 URL
            changeOrigin: true,
            onProxyReq: (proxyReq, req, res) => {
                if (req.method === 'POST' && req.body) {
                  const bodyData = JSON.stringify(req.body);
                  proxyReq.setHeader('Content-Type', 'application/json');
                  proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                  proxyReq.write(bodyData);
                }
        });
};