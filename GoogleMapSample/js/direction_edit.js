//http://use-google-service.blogspot.sg/2012/06/blog-post.html

//初期化(非同期スクリプト読み込みかつDOMイベントで初期化)
function initMap() {

    google.maps.event.addDomListener(window, 'load', function () {
        // global values
        //https://developers.google.com/maps/documentation/javascript/examples/directions-draggable
        var directionsDisplay=new google.maps.DirectionsRenderer({
            draggable: true
        });
        var directionsService = new google.maps.DirectionsService();
        var tokyo = new google.maps.LatLng(35.680674, 139.766773);
        var yokohama = new google.maps.LatLng(35.465778, 139.622088);

        var map;
        initizlize();
        calcRoute();

        function initizlize(){

            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 10,
                center: tokyo
            });

            directionsDisplay.setMap(map);
            google.maps.event.addListener(directionsDisplay, 'directions_changed', directionsChanged);
        }

        function calcRoute() {
            var request = {
                origin: tokyo,
                destination: yokohama,
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        }

        function directionsChanged() {
            //http://stackoverflow.com/questions/4657860/google-maps-saving-dragable-directions
            var directions = directionsDisplay.getDirections();
            var leg=directions.routes[0].legs[0];
            var waypoints = leg.via_waypoint;
            
            var path = { start: null, wp: [], end: null };
            path.start = { lat: leg.start_location.lat(), lng: leg.start_location.lng() }
            path.end = { lat: leg.end_location.lat(), lng: leg.end_location.lng() }

            waypoints.forEach(function (val, index, ar) {
                path.wp.push({ lat: val.location.lat(), lng: val.location.lng() });
            });

            document.getElementById('path').innerHTML = JSON.stringify(path);
            /*
            var path = "[" + leg.start_location.lat() + "," + leg.start_location.lng() + "]";
            waypoints.forEach(function (val, index, ar) {
                path += "[" + val.location.lat() + "," + val.location.lng() + "]";
            });
            path += "[" + leg.end_location.lat() + "," + leg.end_location.lng() + "]";
            document.getElementById('path').innerHTML = path;
            */
        }
    });
}