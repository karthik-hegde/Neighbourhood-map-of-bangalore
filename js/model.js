//model
var locations = [
  {
    title: "Bannerghatta National Park",
    placeId: "ChIJdYVZGBFqrjsR7NoOHXoNBi4",
    position: {
      lat: 12.800359,
      lng: 77.57761
    }
  },
  {
    title: "Cubbon Park",
    placeId: "ChIJL2fQ53MWrjsRuN9D6aalLMY",
    position: {
      lat: 12.976347,
      lng: 77.592928
    }
  },{
    title: "Lal bagh",
    placeId: "ChIJHdPykcEVrjsRIr4v35kLEY4",
    position: {
      lat: 12.950743,
      lng: 77.584777
    }
  },  {
      title: "Nandi Hills India",
      placeId: "ChIJF-r860XksTsRCGYZWSn3ORY",
      position: {
        lat: 13.370154,
        lng: 77.683455
      }
    },{
    title: "Onesta",
    placeId: "ChIJKf2vjtwXrjsRHtmrN4t2fZ4",
    position: {
      lat: 13.029243,
      lng: 77.570907
    }
  }
]

var map, service, largeInfowindow, bounds;
var markers = [];
