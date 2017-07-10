
//initializing map
function initMap() {
  var uluru = {
    lat: 12.971599,
    lng: 77.594563
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: uluru
  });
  largeInfowindow = new google.maps.InfoWindow();
  bounds = new google.maps.LatLngBounds();
  service = new google.maps.places.PlacesService(map);
  populateMarker(locations);
  map.fitBounds(bounds);
}
//generate markers to show on map
function populateMarker(locations) {
  for (var i = 0; i < locations.length; i++) {
    var loc = locations[i].position;
    var marker = new google.maps.Marker({
      position: loc,
      animation: google.maps.Animation.DROP,
      title: locations[i].title,
      placeId: locations[i].placeId,
      show: true,
      map: map
    });
    markers.push(marker);
    bounds.extend(locations[i].position);
    bindEvent(marker);

  }
}

function bindEvent(marker) {
  marker.addListener('click', function() {
    getDetails(marker);
  });
}
//display all markers
function showAllMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setVisible(true);
  }
}
//display specific marker
function showMarker(place) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].placeId == place.placeId) {
      markers[i].setVisible(true);
    }
  }
}
//remove all markers
function removeMarker(place) {
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].placeId == place.placeId) {
      markers[i].setVisible(false);
    }
  }
}

function setTimer(marker){
  setTimeout(function() {
    marker.setAnimation(null);
  }, 3500);
}
//display the data passed to this function at a given marker in a info window
function populateInfoWindow(data, marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + data + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.setMarker = null;
    });
  }
}

// obtain details from the google places api and wiki api
function getDetails(location) {
  var marker;
  for (var i = 0; i < markers.length; i++) {
    if (markers[i].placeId == location.placeId) {
      marker = markers[i];break;
    }
  }
  if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        //the animation stops after 3.5 seconds
        setTimer(marker);
      }
      map.setZoom(13);
      map.setCenter(marker.getPosition());
      service.getDetails({
        placeId: marker.placeId
      }, function(place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // if data is obtained display using observables
          populateInfoWindow(place.formatted_address, marker, largeInfowindow);
          place_name(place.name);
          place_description(place.types[0]);
          if (place.types[0] != 'restaurant') {
            var title = encodeURIComponent((marker.title).trim());
            var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + title + "&format=json&limit=1&callback=wikiCallback";
            //obtain description of the place using wiki api
            $.ajax({
              url: wikiurl,
              dataType: "jsonp",
              success: function(data) {
                console.log(data);
                place_description(data[2]);
              }
            });
          }
          place_image(place.photos[0].getUrl({
            'maxWidth': 200,
            'maxHeight': 200
          }));
          if (place.rating !== undefined) {
            place_rating("Rating : " + place.rating);
          } else {
            place_rating(null);
          }
          if (place.international_phone_number !== undefined) {
            place_contact("Contact number : " + place.international_phone_number);
          } else {
            place_contact(null);
          }
        } else {
          error_message("could not fetch data from googlePlace service");
        }
      });

    }


//view model
var viewModel = function() {
  searchQuery = ko.observable();
  place_image = ko.observable();
  place_name = ko.observable();
  place_contact = ko.observable();
  place_description = ko.observable();
  place_rating = ko.observable();
  apiError = ko.observable(false);
  error_message = ko.observable();
  searchResult = ko.computed(function() {
    query = searchQuery();
    if (!query) {
      showAllMarker();
      return locations;
    } else {
      return ko.utils.arrayFilter(locations, function(place) {
        if (place.title.toLowerCase().indexOf(query) >= 0) {
          return place;
        }
        removeMarker(place);
      });
    }
  });

};
//apply binding to the observales
ko.applyBindings(viewModel);
