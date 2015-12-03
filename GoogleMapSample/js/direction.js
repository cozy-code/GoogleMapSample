//http://use-google-service.blogspot.sg/2012/06/blog-post.html

//初期化(非同期スクリプト読み込みかつDOMイベントで初期化)
function initMap() {

    google.maps.event.addDomListener(window, 'load', function () {
        // global values
        var directionsDisplay=new google.maps.DirectionsRenderer();
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
    });
}