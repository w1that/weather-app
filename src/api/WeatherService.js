import axios from "axios";

export const getWoeId = (lat, long, setWoeId, setLoading) => {
  axios
    .get(
      `${process.env.REACT_APP_API_BASE}location/search/?lattlong=${lat},${long}`,
      { "Content-Type": "text/plain" }
    )
    .then((res) => {
      setWoeId(res.data[0].woeid);
      setLoading(false);
    })
    .catch((err) => console.log("err1", err));
};

export const getConsolidatedWeatherReport = (
  woeid,
  setConsolidatedWeather,
  setLoading
) => {
  
  axios
    .get(
      `${process.env.REACT_APP_API_BASE}location/${woeid}`
    )
    .then((res) => {
      setConsolidatedWeather(res.data);
      setLoading(false);
    })
    .catch((err) => {
      if(err.message.includes('429')){
        alert('Too Many Requests. Continue with https://weather-app-w1that.vercel.app/app-w-fake-data');
      }
      
      
    });
};

export const getLocationBasedOnName = (inputText, setResultData) => {
  axios
    .get(
      `${process.env.REACT_APP_API_BASE}location/search/?query=${inputText}`
    )
    .then((res) => setResultData(res.data))
    .catch((err) => console.log("err3", err));
};
