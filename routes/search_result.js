var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var keyword = req.query['keyword'];
    req.getConnection((err, conn) => {
        var sql = `SELECT * FROM movie WHERE name LIKE '${keyword}' OR name LIKE '%${keyword}' OR name LIKE '${keyword}%' OR name LIKE '%${keyword}%' OR year LIKE '${keyword}' OR year LIKE '%${keyword}' OR year LIKE '${keyword}%' OR year LIKE '%${keyword}%' OR type LIKE '${keyword}' OR type LIKE '%${keyword}' OR type LIKE '${keyword}%' OR type LIKE '%${keyword}%'`;
        conn.query(sql, [], (err, row) => {
            res.render('search_result', {title: 'Search Result', data: row});
        })
    });
});

router.post('/comments', function(req, res, next) {
    var data = req.body;
    req.getConnection((err, conn) => {
        var sql = `SELECT distinct username,comments FROM info natural join user WHERE name = '${data['movie']}' AND year = '${data['year']}'`;
        conn.query(sql, [], (err, row) => {
            if (!!row) res.json(JSON.stringify(row));
            else res.json(JSON.stringify({}));
        });
    });
});

router.post('/delete_comment', function(req, res, next) {
    var id = req.body['id'];
    req.getConnection((err, conn) => {
        var sql = `DELETE FROM info WHERE info_id = '${id}'`;
        conn.query(sql, [], (err, row) => {
            res.json(JSON.stringify({result: 1}));
        });
    });
});

router.post('/add_comment', function(req, res, next) {
    var data = req.body;
    req.getConnection((err, conn) => {
        var sql = `INSERT INTO info(name, year, comments, info_rate, email) VALUES ('${data["movie"]}', '${data["year"]}', '${data["comment"]}', '3', '${data["email"]}')`;
        conn.query(sql, [], function(err, row) {
            res.json(JSON.stringify({result: 1}));
        });
    });
});

router.post('/get_user_comments', (req, res, next) => {
    var email = req.body.email;
    req.getConnection((err, conn) => {
        var sql = `SELECT info_id, comments, name FROM info WHERE email = '${email}'`;
        conn.query(sql, [], (err, row) => {
            res.json(JSON.stringify(row));
        });
    });
});



module.exports = router;
