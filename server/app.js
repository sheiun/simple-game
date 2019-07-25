const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

var position = {
    x: 200,
    y: 200
};

io.on("connection", socket => {
    socket.emit("position", position);
    socket.on("move", data => {
        switch (data) {
            case "left":
                position.x -= 5;
                io.emit("position", position);
                break;
            case "right":
                position.x += 5;
                io.emit("position", position);
                break;
            case "up":
                position.y -= 5;
                io.emit("position", position);
                break;
            case "down":
                position.y += 5;
                io.emit("position", position);
                break;
        }
        console.log(position.x, position.y)
    });
});

const port = 3001;

server.listen(port, '0.0.0.0', () => {
    console.log(`Listen on :${port}`)
});