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
      title: locations[i].title,
      map: map
    });
    markers.push(marker);

    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    })

  }
  populateList(locations);

  service.getDetails({
    placeId: 'ChIJKf2vjtwXrjsRHtmrN4t2fZ4'
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Create marker
      console.log("success");
    }
  });
  console.log(service);
}




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


//ko.applyBindings(new AppModel());
