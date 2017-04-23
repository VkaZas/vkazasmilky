'use strict';

var _host_address = 'http://localhost:3000/';
// var _host_address = 'https://vkazasmilky.herokuapp.com/';
var _googleapi_key = 'AIzaSyCecJ8mvbcO3_fY4UpBUgcVeb5x-1bwUcY';
var _googleapi_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

function request(url, obj, cb, method, err) {
    $.ajax({
        url: url,
        type: method || 'POST',
        async: true,
        data: obj,
        dataType: 'json',
        success: function(data, textStatus, jqXHR) {
            cb($.parseJSON(data), textStatus);
        },
        error: function(xhr, textStatus) {
            if (!!err) {
                err(xhr, textStatus);
            } else {
                console.log(xhr);
                console.log(textStatus);
            }
        }
    })
}