"use strict";
import mapboxgl from "mapbox-gl";
import displayNavigationControls from "./components/navigationControl";
import fetchData from "./components/fetchData";
import getUserCoordinates from "./components/getUserCoordinates";

// SELECTIONS
export const inputField = document.querySelector(".form__input-address");
const submitButton = document.querySelector(".form__btn");
export const informationContainer = document.querySelector(".information");
export const errorLabel = document.querySelector(".error-label");

// MAPBOX RELATED INFO
mapboxgl.accessToken = `pk.eyJ1Ijoic3RlZmFuby12aWRtYXIiLCJhIjoiY2xndXMxYWozMG84NDNnbzU5amxna2gyYSJ9.D26LMla7xGwC_NJRZMnODA`;

// API RELATED INFO
const GEOLOCATION_API_KEY = `c44734fe3c4247e581164b9fc60221d4`;
const GEOLOCATION_BASE_URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}`;

// Creating the map
export let map;
export const createMap = (coords, zoom) => {
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coords,
    zoom: zoom,
  });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // SUCCESS CALLBACK FUNCTION
    (position) => {
      // getting user coordinates
      const userCoordinates = getUserCoordinates(position);
      // assgining map to the function that creates a map
      map = createMap(userCoordinates, 8, map);
      // showing zoom controls on the map;
      map.addControl(displayNavigationControls(), "bottom-right");
      // fetching the data at the load of the page
      fetchData(GEOLOCATION_BASE_URL, inputField);
      // EVENT LISTENER
      submitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const popupEl = document.querySelector(".popup");
        fetchData(
          `${GEOLOCATION_BASE_URL}${
            inputField.value ? `&ip=${inputField.value}` : ""
          }`,
          inputField
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
export default errorLabel;
