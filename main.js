import mapboxgl from "mapbox-gl";
import createMarker from "./components/createMarker";
import createPopup from "./components/createPopup";
import displayData from "./components/displayingData";
("use strict");
// SELECTIONS
const inputField = document.querySelector(".form__input-address");
const submitButton = document.querySelector(".form__btn");
const informationContainer = document.querySelector(".information");
const errorLabel = document.querySelector(".error-label");

// MAPBOX RELATED INFO
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3RlZmFuby12aWRtYXIiLCJhIjoiY2xndXMxYWozMG84NDNnbzU5amxna2gyYSJ9.D26LMla7xGwC_NJRZMnODA";
// API RELATED INFO
const GEOLOCATION_API_KEY = `c44734fe3c4247e581164b9fc60221d4`;
const GEOLOCATION_BASE_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}`;

// GLOBALS
let map;

// Creating the map
const createMap = (coords, zoom) => {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coords,
    zoom: zoom,
  });
};
const fetchGeolocationData = (url) => {
  return fetch(`${url}`);
};

const setView = (map, coordinates) => {
  return map.flyTo({
    center: coordinates,
    duration: 8000,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });
};
const getUserCoordinates = (pos) => {
  const { latitude, longitude } = pos.coords;
  // getting user coordinates
  return [latitude, longitude];
};
const fetchData = (url) => {
  fetchGeolocationData(url)
    .then((response) => response.json())
    .then(
      (responseData) => {
        // guard clause incase there is a error
        if (responseData.message) {
          errorLabel.textContent = `Please Enter a correct IPV4 or IPV6 address`;
          inputField.classList.add("error-input");
          return;
        }
        const coordinates = displayData(responseData, informationContainer);
        if (
          coordinates[0] < -99 ||
          coordinates[0] > 99 ||
          coordinates[1] < -99 ||
          coordinates[1] > 99
        ) {
          return alert(
            "invalid coordinates therefore no marker will show up but here are the information regarding the ip address inputted"
          );
        }
        const popup = createPopup(
          40,
          `IP Address: ${responseData.ip}  Latitude: ${responseData.latitude} Longitude: ${responseData.longitude}`
        );
        createMarker("black", coordinates, popup, map);

        // move to marker on map when the marker is rendered
        setView(map, coordinates);
        return responseData;
      },
      (error) => {
        errorLabel.textContent = `Please Enter a correct IPV4 or IPV6 address`;
        inputField.classList.add("error-input");
      }
    )
    // Clearing the input field after the data has been used using .finally this basacially will run anyway either fullfiled or reject
    .finally(() => {
      inputField.value = "";
    });
};
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // SUCCESS CALLBACK FUNCTION
    (position) => {
      // getting user coordinates
      const userCoordinates = getUserCoordinates(position);
      // assgining map to the function that creates a map
      createMap(userCoordinates, 8, map);
      // fetching the data at the load of the page
      fetchData(GEOLOCATION_BASE_URL);
      // EVENT LISTENER
      submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const popupEl = document.querySelector(".popup");
        fetchData(
          `${GEOLOCATION_BASE_URL}${
            inputField.value ? `&ip=${inputField.value}` : ""
          }`
        );
        // guard Clause incase there is no element then dont remove because it will throw an error due to no element found
        if (popupEl === null) return;
        popupEl.remove();
      });
      // clearing the error label on click of the input field and clearing the red border
      inputField.addEventListener("click", (e) => {
        errorLabel.textContent = "";
        inputField.classList.remove("error-input");
      });
    },

    // ERROR CALLBACK FUNCTION
    (position) => {
      alert(
        `${position.message}, CODE: ${position.code} Please enable location services`
      );
      location.reload();
    }
  );
}
