  // Data for the markers consisting of a name, a LatLng and a zIndex for the
  // order in which these markers should display on top of each other.
  function setMarkers(map, employees) {
    // Adds tasks & its markers to the map.

    var markers = [];
    var infoWindow = new google.maps.InfoWindow();

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    for (var i = 0; i < employees.length; i++) {
        employee = employees[i]
        coordinates = { lat: employee["office_location"]["latitude"], lng: employee["office_location"]["longitude"] }
        var marker = new google.maps.Marker({
            position: coordinates,
            label: employee["first_name"][0] + employee["last_name"][0]
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function(marker, email) {
            return function() {
                $.ajax({url: "/employee/"+email, success: function(result){
                    infoWindow.setContent(result);
                    infoWindow.open(map, marker);
                }});
            }
        })(marker, employee["email"]));
    }

    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

//    google.maps.event.addListener(markerCluster, 'clusterclick', function(cluster) {
//      // Optional: Set some offset for latitude,
//      // so that the InfoWindow opens a bit above the cluster
//      var offset = 0;
//      infoWindow.setContent('<div>Some content</div>');
//      infoWindow.setPosition({
//        lat: cluster.center_.lat() * (1 + offset),
//        lng: cluster.center_.lng()
//      });
//      infoWindow.open(map);
//    });

  }
