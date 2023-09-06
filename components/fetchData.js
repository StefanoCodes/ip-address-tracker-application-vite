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

const fetchData = async (url, inputField) => {
  try {
    // BUG: note that im still fetching the data even tough the ip address is invalid im only able to discover this when the responseData is converted to JSON and it has the property message
    // SOLUTION: is before fetching the data the input field should check that the ip address is valid
    const responseData = await getDataToJSON(url);
    if (responseData.message)
      throw new Error("Please Enter a correct IPV4 or IPV6 address");
    const coordinates = displayData(responseData, informationContainer);
    if (checkCoordinatesInvalid(coordinates))
      throw new Error("invalid coordinates therefore no marker will show up");

    const popup = createPopup(
      40,
      `IP Address: ${responseData.ip}  Latitude: ${responseData.latitude} Longitude: ${responseData.longitude}`
    );
    createMarker("black", coordinates, popup, map);

    // move to marker on map when the marker is rendered
    setView(map, coordinates);
    return responseData;
  } catch (error) {
    renderError(error.message);
  }
  // anything outside the try catch bloc is considered finally
  inputField.value = "";
};

export default fetchData;
