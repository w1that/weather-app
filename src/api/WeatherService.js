import axios from "axios";

export const getWoeId = (lat, long, setWoeId) => {
  console.log('getwoeid')
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
  console.log('getconsolidatedweatherreport')
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

export const getLocationBasedOnName =(inputText, setResultData)=>{
  console.log('getlocationbasedonname')
  axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${inputText}`)
  .then(res=>setResultData(res.data))
  .catch(err=>console.log(err));
}