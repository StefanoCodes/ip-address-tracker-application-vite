const setView = (map, coordinates) => {
  return map.flyTo({
    center: coordinates,
    duration: 8000,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
  });
};

export default setView;
