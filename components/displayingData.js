const displayData = (data, container) => {
  // renaming the destructured values
  const {
    ip,
    isp,
    country_capital,
    country_code2,
    latitude,
    longitude,
    zipcode,
    country_flag,
  } = data;
  const { offset } = data.time_zone;
  const html = `<div class="popup">
  <div class="popup__data-group">
    <p class="popup__data-group-label">ip address</p>
    <h4 class="popup__data-group-text">${ip}</h4>
  </div>
  <div class="popup__data-group">
    <p class="popup__data-group-label">location</p>
    <h4 class="popup__data-group-text">${country_capital}, ${country_code2} ${
    zipcode ? zipcode : ""
  }</h4>
  <img src="${country_flag}">
  </div>
  <div class="popup__data-group">
    <p class="popup__data-group-label">timezone</p>
    <h4 class="popup__data-group-text">UTC ${
      offset > 0
        ? `+ ${String(offset).padStart("2", "0")}:00`
        : `- 0${Math.abs(offset)}:00`
    }</h4>
  </div>
  ${
    isp
      ? `<div class="popup__data-group border-none">
        <p class="popup__data-group-label">isp</p>
        <h4 class="popup__data-group-text">${isp}</h4>
      </div>`
      : ""
  }
  
</div>
</div>`;
  `${container.insertAdjacentHTML("beforeend", html)}`;
  return [latitude, longitude];
};
export default displayData;
