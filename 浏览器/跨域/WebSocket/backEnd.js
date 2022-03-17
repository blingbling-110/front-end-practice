const { createServer } = require('http');
const { Server } = require('socket.io');

// 启动http服务
const httpServer = createServer(function (req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});

const io = new Server(httpServer, {
    cors: {
        origin: 'http://source.domain.com:5500'
    }
})

httpServer.listen('8080');
console.log('Server is running at port 8080...');

// 监听socket连接
io.listen(httpServer).on('connection', function (client) {
    // 接收信息
    client.on('message', function (msg) {
        client.send('hello：' + msg);
        console.log('data from client: ---> ' + msg);
    });

    // 断开处理
    client.on('disconnect', function () {
        console.log('Client socket has closed.');
    });
});