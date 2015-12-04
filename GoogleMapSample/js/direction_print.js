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
        var map_start;
        var map_end;

        var startMark;
        var endMark;

        initizlize();

        function initizlize(){
            var initLocation = tokyo;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 14,
                center: initLocation
            });
            /// 現在位置が使えたら使う
            ///http://shared-blog.kddi-web.com/activity/210
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (pos) {
                    map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                });
            }

            google.maps.event.addListener(map, 'click', function (event) {
                // クリック地点の緯度経度
                var position = event.latLng;
                if (!startMark) {
                    // マーカー生成
                    startMark = new google.maps.Marker({
                        draggable: true,// ドラッグ許可
                        position: position,
                        map: map
                    });
                } else if (!endMark) {
                    endMark = position;
                    calcRoute(startMark.getPosition(), position);
                    startMark.setMap(null);
                }
            });


            directionsDisplay.setMap(map);
            google.maps.event.addListener(directionsDisplay, 'directions_changed', directionsChanged);

            // Sub Maps
            map_start = new SubMap(map, 'start');
            map_end = new SubMap(map, 'end');
            google.maps.event.addListener(map, 'zoom_changed', function (event) {
                map_start.setZoom(map.getZoom());
                map_end.setZoom(map.getZoom());
            });


        }

        function calcRoute(start,end) {
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, function (result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(result);
                }
            });
        }

        function SubMap(mainmap,elementID) {
            this.elementID = elementID;
            this.mainmap = mainmap;
            this.submap = null;
            this.submap_direction = null;
        }
        SubMap.prototype.setDirections = function (directions, location) {
            if (!this.submap) {
                this.submap = new google.maps.Map(document.getElementById(this.elementID), {
                    zoom: this.mainmap.getZoom() + 2,
                    center: location
                });
                this.submap_direction = new google.maps.DirectionsRenderer({ preserveViewport: true });
                this.submap_direction.setMap(this.submap);
            }
            this.submap.setCenter(location);
            this.submap_direction.setDirections(directions);
        };
        SubMap.prototype.setZoom = function (zoom) {
            if (this.submap) {
                var cur_zoom = this.submap.getZoom();
                if (cur_zoom < zoom) {
                    this.submap.setZoom(zoom+2);
                }
            }
        }


        function directionsChanged() {
            //http://stackoverflow.com/questions/4657860/google-maps-saving-dragable-directions
            var directions = directionsDisplay.getDirections();
            var leg=directions.routes[0].legs[0];
            var waypoints = leg.via_waypoint;
            
            
            map_start.setDirections(directions ,leg.start_location);
            map_end.setDirections(directions, leg.end_location);
        }
    });
}