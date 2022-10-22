export const state = {
  currentPosition: {},
  search: {
    query: "",
    result: {},
  },
};

export const loadApi = async function () {
  try {
    if (navigator.geolocation) {
      alert(
        `Allow Weather App to Access your location or closest location?`,
        navigator.geolocation.getCurrentPosition(
          async function (position) {
            const { latitude } = position.coords;
            const { longitude } = position.coords;
            const data = await fetch(
              `http://api.weatherapi.com/v1/forecast.json?key=6d3406fe7d6a4c7ebaf61114221710&q=${latitude},${longitude}&days=1&aqi=no&alerts=no`
            );
            const response = await data.json();
            state.currentPosition = response;
          },
          function () {
            alert(
              `couldn't get current position check your internet connection and try again`
            );
          }
        )
      );
    }
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    // fetch latitude and longitude from  API
    const data = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=6d3406fe7d6a4c7ebaf61114221710&q=${query}`
    );
    const response = await data.json();

    // use latitude and longitude to fetch weather forecast
    const data2 = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=6d3406fe7d6a4c7ebaf61114221710&q=${response[0].lat},${response[0].lon}&days=1&aqi=no&alerts=no`
    );
    const response2 = await data2.json();

    state.search.result = response2;

    console.log(response2);
  } catch (err) {
    throw err;
  }
};
