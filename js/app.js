console.log("in the name of js");
var markers = [];
var locations = [{
    title: "onesta",
    place_Id: "ChIJKf2vjtwXrjsRHtmrN4t2fZ4",
    position: {
      lat: 13.029243,
      lng: 77.570907
    }
  },
  {
    title: "nandi hills",
    place_Id: "ChIJF-r860XksTsRCGYZWSn3ORY",
    position: {
      lat: 13.370154,
      lng: 77.683455
    }
  },
  {
    title: "lalbhag botonical garden",
    place_Id: "ChIJHdPykcEVrjsRIr4v35kLEY4",
    position: {
      lat: 12.950743,
      lng: 77.584777
    }
  }
]

function initMap() {
  var uluru = {
    lat: 12.971599,
    lng: 77.594563
  };

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var service = new google.maps.places.PlacesService(map);


  for (var i = 0; i < locations.length; i++) {
    var loc = locations[i].position;
    var marker = new google.maps.Marker({
      position: loc,
      animation: google.maps.Animation.DROP,
      title: locations[i].title,
      placeId: locations[i].place_Id,
      map: map
    });
    markers.push(marker);

    map.addListener('center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 10000);
    });

    marker.addListener('mouseover', function() {
      populateInfoWindow(this, largeInfowindow); // calling infowindow when hovered over marker
    });
    bindEvent(marker, loc, i,map,service);

  }
}
populateList(locations);






function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker = null;
    });
  }
}

function populateList(locations) {
  var data = "<button class='button'>%data%</button>"
  for (var i = 0; i < locations.length; i++) {
    $("#list").append(data.replace("%data%", locations[i].title));
  }
}

function bindEvent(marker, pos, i,map,service) {

  google.maps.event.addListener(marker,'click', function() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    map.setZoom(13);
    map.setCenter(marker.getPosition());
    service.getDetails({
      placeId: marker.placeId
    }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Create marker
        console.log(place);
      }
    });
  });
}
//ko.applyBindings(new AppModel());
