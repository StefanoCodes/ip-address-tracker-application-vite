const getUserCoordinates = (pos) => {
  const { latitude, longitude } = pos.coords;
  // getting user coordinates
  return [latitude, longitude];
};
export default getUserCoordinates;
