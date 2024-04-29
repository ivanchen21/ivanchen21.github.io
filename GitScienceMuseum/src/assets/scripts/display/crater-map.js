import { getCraterDiameter } from "../controller/crater-calculations.js";

// https://developers.google.com/maps/documentation/javascript

var map;
var circles = []; 

// Initialize Map
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: { lat: 40.6, lng: -74.10 },
        zoom: 11,
        clickableIcons: false,
        restriction: { 
            latLngBounds: {north: 85, south: -85, west: -180, east: 180},
            strictBounds: true,
        }
    });
    map.addListener("click", displayCrater);
}

// Make circle on map with calculated size at clicked location
function displayCrater(mapMouseEvent) {
    let lat = mapMouseEvent.latLng.lat();
    let lng = mapMouseEvent.latLng.lng();
    //console.log(lat);
    //console.log(lng);

    const crater_diameter = getCraterDiameter();
    //console.log(crater_diameter);

    const crater = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        clickable: false,
        center: { lat: lat, lng: lng },
        radius: (crater_diameter / 2)
    });

    circles.push(crater);
    //console.log(circles);

}

function clearCraters(){
    for(let i = 0; i < circles.length; i++){
        circles[i].setMap(null);
    }
    circles = [];
}

export { displayCrater, initMap, clearCraters };