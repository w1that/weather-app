import axios from "axios";

export const getWoeId = (lat, long, setWoeId) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?lattlong=${lat},${long}`,
      { "Content-Type": "text/plain" }
    )
    .then((res) => setWoeId(res.data[0].woeid))
    .catch((err) => console.log(err));
};

export const getConsolidatedWeatherReport = (
  woeid,
  setConsolidatedWeather,
  setLoading
) => {
  axios
    .get(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}`
    )
    .then((res) => {
      setConsolidatedWeather(res.data);
      setLoading(false);
    })
    .catch((err) => console.log(err));
};
