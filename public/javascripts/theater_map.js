$(function() {

});


function initMap() {
    window.navigator.geolocation.getCurrentPosition(function(data) {
        var coords = {
            lat : data.coords.latitude,
            lng : data.coords.longitude
        };
        var map = new google.maps.Map($('#theater-map').get(0), {
            zoom: 12,
            center: coords
        });
        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            label: 'You'
        });
        getTheaterLocation(coords, map);
    });
}

function getTheaterLocation(coords, map) {
    request(_host_address + 'theater_map/fetch_theater_location', {
        lat: coords.lat,
        lng: coords.lng,
        key: _googleapi_key
    }, function(data) {
        var locations = $.parseJSON(data)['results'];
        for (var i=0; i<locations.length; i++) {
            var marker = new google.maps.Marker({
                position: locations[i]['geometry']['location'],
                map: map,
                label: locations[i]['name']
            })
        }
    });
}

// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-40.112375199999995,-88.2272539&radius=500&type=movie_theater&key=AIzaSyCecJ8mvbcO3_fY4UpBUgcVeb5x-1bwUcY
