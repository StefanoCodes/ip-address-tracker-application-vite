import mapboxgl from "mapbox-gl";
const createPopup = (offsetVal, textContent) => {
  return new mapboxgl.Popup({ offset: offsetVal }).setText(`${textContent}`);
};
export default createPopup;
