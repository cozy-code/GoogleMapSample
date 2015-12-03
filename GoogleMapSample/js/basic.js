// https://developers.google.com/maps/documentation/javascript/tutorial
var map;
function initMap() {
    var tokyo= new google.maps.LatLng( 35.680674, 139.766773 );
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: tokyo
    });
}