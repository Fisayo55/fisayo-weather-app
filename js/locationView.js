class LocationView {
  _parentEl = document.querySelector(".container");
  _loader = document.querySelector(".loader-box");
  _monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  _days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  async getCurrentPositionData(res) {
    const time = new Date(res.location.localtime);
    const day = this._days[time.getDay()];
    const date = time.getDate();
    const month = this._monthNames[time.getMonth()];
    const markUp = `

  <header class="city-day">
    <h3 class="city">${res.location.region},${res.location.country}</h3>
    <h5 class="day">${day} ${date} ${month}</h5>
  </header>

  <section class="section-1">
    <div class="weather">
      <div class="icon-weather">
        <img class="img-header" src="${res.current.condition.icon}" alt="clouds" />
      </div>
      <div class="degree-weather">
        <h3 class="degree">${res.current.temp_c}&#8451</h3>
        <p class="degree-para">${res.current.condition.text}</p>
      </div>
    </div>
    <hr />
    <div class="details">
      <div class="detail">
        <h4 class="detail-details">${res.forecast.forecastday[0].day.maxtemp_c}&#8451</h4>
        <p>High</p>
      </div>
      <div class="detail">
        <h4 class="detail-details">${res.current.wind_mph}mph</h4>
        <p>wind</p>
      </div>
      <div class="detail">
      <h4 class="detail-details">${res.forecast.forecastday[0].day.daily_chance_of_rain}%</h4>
      <p>rain</p>
      </div>
      <div class="detail">
      <h4 class="detail-details">${res.forecast.forecastday[0].day.mintemp_c}&#8451</h4>
      <p>low</p>
      </div>
      <div class="detail">
      <h4 class="detail-details">${res.forecast.forecastday[0].astro.sunrise}</h4>
      <p>sunrise</p>
      </div>
      <div class="detail">
        <h4 class="detail-details">${res.forecast.forecastday[0].astro.sunset}</h4>
        <p>sunset</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="further-reading">
      <h3>Today's Weather</h3>
    </div>
    <div class="section-2">
      <div class="details-later">
        <h4>6am</h4>
        <img src="${res.forecast.forecastday[0].hour[6].condition.icon}" alt="clouds" />
        <h5>${res.forecast.forecastday[0].hour[6].temp_c}&#8451</h5>
        <p>${res.forecast.forecastday[0].hour[6].condition.text}</p>
      </div>
      <div class="details-later">
        <h4>12pm</h4>
        <img src="${res.forecast.forecastday[0].hour[12].condition.icon}" alt="clouds" />
        <h5>${res.forecast.forecastday[0].hour[12].temp_c}&#8451</h5>
        <p>${res.forecast.forecastday[0].hour[12].condition.text}</p>
      </div>
      <div class="details-later">
        <h4>6pm</h4>
        <img src="${res.forecast.forecastday[0].hour[23].condition.icon}" alt="clouds" />
        <h5>${res.forecast.forecastday[0].hour[23].temp_c}&#8451</h5>
        <p>${res.forecast.forecastday[0].hour[23].condition.text}</p>
      </div>
      <div class="details-later">
        <h4>12am</h4>
        <img src="${res.forecast.forecastday[0].hour[0].condition.icon}" alt="clouds" />
        <h5>${res.forecast.forecastday[0].hour[0].temp_c}&#8451</h5>
        <p>${res.forecast.forecastday[0].hour[0].condition.text}</p>
      </div>
    </div>
  </section>

      `;
    this._loader.innerHTML = "";
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
  renderSpinner() {
    const markUp = `<div class="loader"></div>`;

    this._loader.insertAdjacentHTML("afterbegin", markUp);
  }

  RenderError() {
    const markUp = `
    <div class="error-message">
    <h3>
      😔 Sorry we could not access your current location at the moment.
      please check your internet connection and try again.
    </h3>
  </div>
    `;
    this._loader.innerHTML = "";
    this._parentEl.innerHTML = "";
    this._parentEl.insertAdjacentHTML("afterbegin", markUp);
  }
}
export default new LocationView();
