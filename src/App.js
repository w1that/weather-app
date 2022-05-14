/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import bgPattern from "./assets/patternCloudItem.png";
import { mdiCrosshairsGps } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import {
  getConsolidatedWeatherReport,
  getLocationBasedOnName,
  getWoeId,
} from "./api/WeatherService";
import { dateShortener, weatherIconSelector } from "./utils/utils";
import DaysWrapper from "./components/DaysWrapper";
import TodaysHightlightsWrapper from "./components/TodaysHightlightsWrapper";
import LoadingScreen from "./components/LoadingScreen";
import SearchMenu from "./components/SearchMenu";

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

  useEffect(() => {
    if (!searchFieldVisible) {
      setTimeout(() => {
        setSearchInput("");
      }, 300);
    }
  }, [searchFieldVisible]);

  useEffect(() => {
    if (location.coords.latitude === -1 && location.coords.longitude === -1) {
      console.log("location not taken");
    } else {
      if (woeId !== 0) {
        getWoeId(location.coords.latitude, location.coords.longitude, setWoeId);
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
        <BackgroundPattern />
        <ButtonsWrapper
          setLocation={setLocation}
          setSearchFieldVisible={setSearchFieldVisible}
        />
        <SummaryInfoWrapper
          todaysConsolidatedWeather={
            consolidatedWeather.consolidated_weather[0]
          }
          place={consolidatedWeather.title}
          date={consolidatedWeather.time}
        />

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

// BACKGROUND PATTERN COMPONENT ---------------------

function BackgroundPattern() {
  return (
    <div className={styles.backgroundPatternContainer}>
      <motion.img
        animate={{ x: [-150, 700] }}
        transition={{ duration: 10, repeat: Infinity }}
        className={styles.cloud1}
        src={bgPattern}
        alt="cloud1"
      />
      <motion.img
        animate={{ x: [150, -700] }}
        transition={{ duration: 12, delay: 0.8, repeat: Infinity }}
        className={styles.cloud2}
        src={bgPattern}
        alt="cloud2"
      />
      <motion.img
        animate={{ x: [-150, 700] }}
        transition={{ duration: 8, delay: 0.4, repeat: Infinity }}
        className={styles.cloud3}
        src={bgPattern}
        alt="cloud3"
      />
      <motion.img
        animate={{ x: [150, -700] }}
        transition={{ duration: 10, delay: 1, repeat: Infinity }}
        className={styles.cloud4}
        src={bgPattern}
        alt="cloud4"
      />
    </div>
  );
}

// BUTTONS WRAPPER COMPONENT  ---------------------

function ButtonsWrapper({ setLocation, setSearchFieldVisible }) {
  function searchForLocation() {
    window.navigator.geolocation.getCurrentPosition(setLocation, console.log);
  }

  return (
    <div className={styles.buttonsWrapper}>
      <motion.button
        onClick={() => setSearchFieldVisible(true)}
        whileHover={{ scale: 1.1 }}
        className={styles.searchPlacesButton}
      >
        Search for places
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className={styles.locationButton}
        onClick={searchForLocation}
      >
        <Icon
          className={styles.crossHairIcon}
          color="#E7E7EB"
          path={mdiCrosshairsGps}
          title="User Profile"
          size={1}
          horizontal
          vertical
        ></Icon>
      </motion.button>
    </div>
  );
}

// SUMMARY INFO WRAPPER COMPONENT  ---------------------

function SummaryInfoWrapper({ todaysConsolidatedWeather, place, date }) {
  const [src, setSrc] = useState("");

  const { dayName, monthName, today } = dateShortener();

  useEffect(() => {
    weatherIconSelector(todaysConsolidatedWeather.weather_state_abbr, setSrc);
  }, []);

  return (
    <div className={styles.summaryInfoContainer}>
      <motion.img
        whileHover={{ x: [0, -10, 10, 0] }}
        className={styles.todaysConditionImage}
        src={src}
        width={202}
        height={234}
        alt="daily weather icon"
      />
      <h5 className={styles.numericTemperature}>
        {todaysConsolidatedWeather.the_temp.toFixed(0)}
        <span className={styles.temperatureSymbol}>°C</span>
      </h5>
      <h5 className={styles.conditionTitle}>
        {todaysConsolidatedWeather.weather_state_name}
      </h5>
      <div className={styles.dateContainer}>
        <h5 className={styles.day}>Today</h5>
        <h5 className={styles.dot}>•</h5>
        <h5 className={styles.date}>
          {dayName.substring(0, 3)}, {today} {monthName.substring(0, 4)}
        </h5>
      </div>
      <h5 className={styles.place}>
        <Icon className={styles.markerIcon} size={1} path={mdiMapMarker} />{" "}
        {place}
      </h5>
    </div>
  );
}

export default App;
