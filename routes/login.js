var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('account_layout', { title: 'Express' , type: 'login'});
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
      let sql = `SELECT password, username FROM user WHERE email='${obj.email}'`;
      conn.query(sql, [], function(err, row) {
        if (!!row && row.length > 0) {
          let pw = row[0]['password'];
          if (pw == obj.password) {
            resObj['result'] = 1;
            resObj['nickname'] = row[0]['username'];
          } else {
            resObj['result'] = 0;
            resObj['info'] = '[Data Error] Invalid password.'
          }
        } else {
          resObj['result'] = 0;
          resObj['info'] = '[Data Error] Email doesn\'t exist';
        }
        res.json(JSON.stringify(resObj));
      });
    }
  });
});

module.exports = router;
