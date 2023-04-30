import mapboxgl from "mapbox-gl";
const createMarker = (color, coords, attachPopup, mapEl) => {
  return new mapboxgl.Marker({ color: `${color}` })
    .setLngLat(coords) // array [lat,lng]
    .setPopup(attachPopup)
    .addTo(mapEl);
};
export default createMarker;
