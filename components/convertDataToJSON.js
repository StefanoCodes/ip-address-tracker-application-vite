const getDataToJSON = async (url) =>
  await fetch(`${url}`).then((response) => response.json());

export default getDataToJSON;
