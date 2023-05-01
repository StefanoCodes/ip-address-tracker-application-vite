const getUserCoordinates = (pos) => {
  const { latitude, longitude } = pos.coords;
  console.log(latitude, longitude);
  // getting user coordinates
  return [longitude, latitude];
};
export default getUserCoordinates;
