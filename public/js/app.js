"use strict";

// This loads helper components from the Extended Component Library,
// https://github.com/googlemaps/extended-component-library.
// Please note unpkg.com is unaffiliated with Google Maps Platform.
import {APILoader} from 'https://unpkg.com/@googlemaps/extended-component-library@0.6';

const CONFIGURATION = {
  "ctaTitle": "Checkout",
  "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":false,"mapTypeControl":false,"streetViewControl":false,"zoom":20,"zoomControl":false,"maxZoom":22,"mapId":"", "mapTypeId": 'satellite'},
  "mapsApiKey": "AIzaSyDfS5KcLJEX6DAF_cpqAbI3y_ANq-OOrpU",
  "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":false}
};

let roofPolygon;

const SHORT_NAME_ADDRESS_COMPONENT_TYPES =
    new Set(['street_number', 'administrative_area_level_1', 'postal_code']);

const ADDRESS_COMPONENT_TYPES_IN_FORM = [
  'location',
];

function getFormInputElement(componentType) {
  return document.getElementById(`${componentType}-input`);
}

function fillInAddress(place) {
  function getComponentName(componentType) {
    for (const component of place.address_components || []) {
      if (component.types[0] === componentType) {
        return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType) ?
            component.short_name :
            component.long_name;
      }
    }
    return '';
  }

  function getComponentText(componentType) {
    return (componentType === 'location') ?
        `${getComponentName('street_number')} ${getComponentName('route')}` :
        getComponentName(componentType);
  }

  for (const componentType of ADDRESS_COMPONENT_TYPES_IN_FORM) {
    getFormInputElement(componentType).value = getComponentText(componentType);
  }
}

async function renderAddress(place) {
  const mapEl = document.querySelector('gmp-map');
  const markerEl = document.querySelector('gmp-advanced-marker');

  if (place.geometry && place.geometry.location) {
    mapEl.center = place.geometry.location;
    markerEl.position = place.geometry.location;

    try{
        console.log(place)
    }catch(err){
        
    }

    // const footprint = await fetchBuildingFootprint(place.geometry.location);


    // if (footprint) {
    //     drawRoofPolygon(mapEl,footprint);
    // }
  } else {
    markerEl.position = null;
  }
}

async function fetchBuildingFootprint(location) {
    const lat = location.lat();
    const lng = location.lng();
    const url = `https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/tilequery/${lng},${lat}.json?layers=building&limit=1&access_token=pk.eyJ1Ijoidm9vbHRhaSIsImEiOiJjbGdkdXhjbGYxbXJmM3VwYzJpNW45c3RvIn0.ZGcCQboEzKD8hOGsqfo34Q`;

    const response = await fetch(url);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return {lat: data.features[0].geometry.coordinates[1], lng: data.features[0].geometry.coordinates[0]};
    }
    return null;
}

function drawRoofPolygon(mapEl,coordinates) {
if (roofPolygon) {
    roofPolygon.setMap(null);
}

console.log(coordinates)

roofPolygon = new google.maps.Polygon({
    paths: coordinates,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
});

roofPolygon.setMap(mapEl.innerMap);
}

async function initMap() {
  const {Autocomplete} = await APILoader.importLibrary('places');

  const mapOptions = CONFIGURATION.mapOptions;
  mapOptions.mapId = mapOptions.mapId || 'DEMO_MAP_ID';
  mapOptions.center = mapOptions.center || {lat: 37.4221, lng: -122.0841};

  await customElements.whenDefined('gmp-map');
  document.querySelector('gmp-map').innerMap.setOptions(mapOptions);
  const autocomplete = new Autocomplete(getFormInputElement('location'), {
    fields: ['address_components', 'geometry', 'name'],
    types: ['address'],
  });

  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert(`No details available for input: '${place.name}'`);
      return;
    }
    renderAddress(place);
    fillInAddress(place);
  });
}

initMap();