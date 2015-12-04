//http://use-google-service.blogspot.sg/2012/06/blog-post.html

//初期化(非同期スクリプト読み込みかつDOMイベントで初期化)
function initMap() {

    google.maps.event.addDomListener(window, 'load', function () {
        // global values
        var tokyo = new google.maps.LatLng(35.680674, 139.766773);
        var osaka = new google.maps.LatLng(34.678395, 135.4600447);
        var nagoya = new google.maps.LatLng(35.1680449, 136.8764947);
        var map;
        var clusterer;
        // 初期化！
        initizlize();

        //主要都市を中心にランダムにマーキング
        mark(tokyo, 300);
        mark(osaka, 300);
        mark(nagoya, 300);

        function initizlize() {
            var initLocation = tokyo;
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: 7,
                center: initLocation
            });

            //ズーム値表示
            document.getElementById('zoom').innerText = map.getZoom();
            google.maps.event.addListener(map, 'zoom_changed', function (event) {
                document.getElementById('zoom').innerText=map.getZoom();
            });

            //http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/docs/examples.html
            // マーカークラスターの作成
            var mcOptions = {
                gridSize: 50,
                maxZoom: 15
            };
            clusterer = new MarkerClusterer(map, [], mcOptions);

        }

        function mark(center,count) {
            for (var i = 0; i < count; i++) {
                //適当に渦巻きでマーク
                var x = (i * Math.cos(Math.random()*6.3))/150;
                var y = (i * Math.sin(Math.random()*6.3))/150;
                var pos = new google.maps.LatLng(center.lat() + x, center.lng() + y);
                // マーカー生成
                startMark = new google.maps.Marker({
                    position: pos
                });
                clusterer.addMarker(startMark);
            }
        }


    });
}