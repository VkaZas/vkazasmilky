var express = require('express');
var router = express.Router();
var node_request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('theater_map', {title: 'Theater Map'});
});

router.post('/fetch_theater_location', (req, res, next) => {
    let data = req.body;
    let _googleapi_url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data['lat']},${data['lng']}&rankby=distance&type=movie_theater&key=${data['key']}`;
    node_request(_googleapi_url, function(err, result, body) {
        res.json(JSON.stringify(body));
    });
});

module.exports = router;
