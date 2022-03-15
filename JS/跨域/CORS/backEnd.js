const http = require('http');
const server = http.createServer();
const qs = require('querystring');

server.on('request', function (req, res) {
    let postData = '';

    // 数据块接收中
    req.addListener('data', function (chunk) {
        postData += chunk;
    });

    // 数据接收完毕
    req.addListener('end', function () {
        postData = qs.parse(postData);

        // 跨域后台设置
        res.writeHead(200, {
            'Access-Control-Allow-Credentials': 'true',     // 后端允许发送Cookie
            'Access-Control-Allow-Origin': 'http://source.domain.com:5500',    // 允许访问的域（协议+域名+端口）
            /* 
             * 此处设置的cookie还是target.domain.com的而非source.domain.com，因为后端也不能跨域写cookie(nginx反向代理可以实现)，
             * 但只要target.domain.com中写入一次cookie认证，后面的跨域接口都能从target.domain.com中获取cookie，从而实现所有的接口都能跨域访问
             */
            'Set-Cookie': 'pwd=123456;Path=/;Domain=target.domain.com;HttpOnly'  // HttpOnly的作用是让js无法读取cookie
        });

        res.write(JSON.stringify(postData));
        res.end();
    });
});

server.listen('8080');
console.log('Server is running at port 8080...');