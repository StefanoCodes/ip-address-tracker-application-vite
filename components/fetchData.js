import setView from "./setMapView";
import renderError from "./renderErrors";
import createMarker from "./createMarker";
import createPopup from "./createPopup";
import displayData from "./displayingData";
import getDataToJSON from "./convertDataToJSON";
import { informationContainer } from "../main";
import { map } from "../main";

const checkCoordinatesInvalid = (coords) => {
  return coords[0] < -99 || coords[0] > 99 || coords[1] < -99 || coords[1] > 99;
};

const fetchData = (url, inputField) => {
  getDataToJSON(url)
    .then((responseData) => {
      if (responseData.message) {
        renderError();
        return;
      }
      const coordinates = displayData(responseData, informationContainer);
      if (checkCoordinatesInvalid(coordinates)) {
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
    })
    .catch((err) => {
      renderError();
    })
    // Clearing the input field after the data has been used using .finally this basacially will run anyway either fullfiled or reject
    .finally(() => {
      inputField.value = "";
    });
};

export default fetchData;
