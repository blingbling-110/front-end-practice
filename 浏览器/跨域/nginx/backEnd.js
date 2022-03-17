const http = require('http');
const server = http.createServer();
const qs = require('querystring');

server.on('request', function(req, res) {
    const params = qs.parse(req.url.substring(2));

    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'pwd=123456;Path=/;Domain=target.domain.com;HttpOnly'   // HttpOnly:脚本无法读取
    });

    res.write(JSON.stringify(params));
    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');