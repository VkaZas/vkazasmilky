var socketio = {};
var socket_io = require('socket.io');
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'us-cdbr-iron-east-03.cleardb.net',
    user: 'b79cde1de40a72',
    password: '2c000eb5',
    database:'heroku_16d34676adbb711'
});

socketio.getSocketio = function(server){
    var io = socket_io.listen(server);
    socketio.num = 0;

    io.on('connection', (socket) => {
        socketio.num++;
        socket.on('disconnect', () => {
           socketio.num--;
            if (socketio.num == 0) {
                console.log('no body\'s here');
            }
        });
        socket.on('msg-send', (data) => {
            socket.emit('msg-recv', data);
            let sql = `INSERT INTO chat_msg(movie, year, email, nickname, content) VALUES ('${data.movie}', '${data.year}', '${data.email}', '${data.nickname}', '${data.msg}')`;
            pool.getConnection((err, conn) => {
                if (err) {
                    console.log(err);
                    return;
                }
                conn.query(sql, (err, row) => {
                    if (err) console.log(err);
                });
                conn.release();
            })
        });
        socket.on('sync-room', (data) => {
            let sql = `SELECT nickname, content FROM chat_msg WHERE movie = '${data.movie}' and year = '${data.year}'` ;
            pool.getConnection((err, conn) => {
                if (err) {
                    console.log(err);
                    return;
                }
                conn.query(sql, (err, row) => {
                    if (err) console.log(err);
                    socket.emit('sync-room-back', row);
                });
                conn.release();
            });
        });
    });
};

module.exports = socketio;

