/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import {
  getConsolidatedWeatherReport,
  getLocationBasedOnName,
  getWoeId,
} from "./api/WeatherService";
import DaysWrapper from "./components/DaysWrapper";
import TodaysHightlightsWrapper from "./components/TodaysHightlightsWrapper";
import LoadingScreen from "./components/LoadingScreen";
import SearchMenu from "./components/SearchMenu";
import BackgroundPattern from "./components/BackgroundPattern";
import ButtonsWrapper from "./components/ButtonsWrapper";
import SummaryInfoWrapper from "./components/SummaryInfoWrapper";

function App() {
  const [location, setLocation] = useState({
    coords: { latitude: 41.040852, longitude: 28.986179 },
  }); //Istanbul by default
  const [woeId, setWoeId] = useState(2344116); //used for taking 6 day weather report. (Where On Earth IDentifier). Woeid of Istanbul by default
  const [consolidatedWeather, setConsolidatedWeather] = useState({}); //6 day weather report.
  const [searchInput, setSearchInput] = useState("");
  const [searchFieldVisible, setSearchFieldVisible] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);

  // make api call to get results of entered text
  useEffect(() => {
    if (searchInput.length >= 3 && resultData.length === 0) {
      getLocationBasedOnName(searchInput, setResultData);
    }

    if (searchInput.length === 0) {
      setResultData([]);
    }
  }, [searchInput]);

  //remove input 3 seconds after clicking
  useEffect(() => {
    if (!searchFieldVisible) {
      setTimeout(() => {
        setSearchInput("");
      }, 300);
    }
  }, [searchFieldVisible]);

  //check the button that takes users location info is pressed.
  useEffect(() => {
    if (location.coords.latitude === -1 && location.coords.longitude === -1) {
      console.log("location not taken");
    } else {
      if (woeId !== 0) {
        setLoading(true);
        getWoeId(location.coords.latitude, location.coords.longitude, setWoeId, setLoading);
      }
    }
  }, [location.coords.latitude, location.coords.longitude, woeId]);

  useEffect(() => {
    getConsolidatedWeatherReport(woeId, setConsolidatedWeather, setLoading);
  }, [woeId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.container}>
      {/* left hand */}
      <div className={styles.leftSideContainer}>
        {/* clouds that fly at background */}
        <BackgroundPattern />

        {/* search for places and location taker? button */}
        <ButtonsWrapper
          setLocation={setLocation}
          setSearchFieldVisible={setSearchFieldVisible}
        />

        {/* content at left side */}
        <SummaryInfoWrapper
          todaysConsolidatedWeather={
            consolidatedWeather.consolidated_weather[0]
          }
          place={consolidatedWeather.title}
          date={consolidatedWeather.time}
        />

        {/* if user presses search for places, this one comes. */}
        <SearchMenu
          resultData={resultData}
          searchFieldVisible={searchFieldVisible}
          searchInput={searchInput}
          setLoading={setLoading}
          setLocation={setLocation}
          setSearchFieldVisible={setSearchFieldVisible}
          setSearchInput={setSearchInput}
          setWoeId={setWoeId}
          fakeMode={false}
        />
      </div>

      {/* right hand */}
      <div className={styles.detailsFieldContainer}>
        <div className={styles.detailsFieldInnerContainer}>
          <DaysWrapper
            nextFiveDaysConditions={consolidatedWeather.consolidated_weather.slice(
              1,
              6
            )}
          />
          <TodaysHightlightsWrapper
            consolidatedWeather={consolidatedWeather.consolidated_weather[0]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
