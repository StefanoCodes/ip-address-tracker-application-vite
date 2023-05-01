const getDataToJSON = (url) => {
  return fetch(`${url}`).then((response) => response.json());
};

export default getDataToJSON;
