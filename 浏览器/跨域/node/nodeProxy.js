const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/', createProxyMiddleware({
    // 代理跨域目标接口
    target: 'http://target.domain.com:8080',
    changeOrigin: true,

    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function (proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://source.domain.com');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: 'source.domain.com'  // 可以为false，表示不修改
}));

app.listen(8081);
console.log('Proxy server is listen at port 8081...');