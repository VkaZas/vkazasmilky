var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('account_layout', { title: 'Express' , type: 'register'});
});

router.post('/', function(req, res) {
    var obj = req.body;
    var resObj = {};
    req.getConnection((err, conn) => {
        if (err) {
            resObj['info'] = '[DB Error]' + err;
            resObj['result'] = 0;
            res.json(JSON.stringify(resObj))
        } else {
            let sql = `SELECT email FROM user WHERE username='${obj.nickname}' or email='${obj.email}'`;
            conn.query(sql, [], function(err, row) {
                if (row.length > 0) {
                    resObj['info'] = '[Data Error] Email or nickname already exists.';
                    resObj['result'] = 0;
                    res.json(JSON.stringify(resObj));
                } else {
                    let sql = `INSERT INTO user(username, password, email, contribute) VALUES ('${obj.nickname}', '${obj.password}', '${obj.email}', 0.0)`;
                    conn.query(sql, [], function(err, row) {
                        if (!err) {
                            resObj['result'] = 1;
                            res.json(JSON.stringify(resObj));
                        } else {
                            // todo : implement error checking
                        }
                    });

                }
            });
        }
    });

});

module.exports = router;
