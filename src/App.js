import styles from "./styles/App.module.css";
import bgPattern from "./assets/patternCloudItem.png";
import { mdiCrosshairsGps } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { s } from "./assets/weatherIcons";
import { useEffect, useState } from "react";
import { getConsolidatedWeatherReport, getWoeId } from "./api/WeatherService";

function App() {

  const [location, setLocation] = useState({coords:{latitude:41.040852, longitude:28.986179}}); //Istanbul by default
  const [woeId, setWoeId] = useState(2344116);    //used for taking 6 day weather report. (Where On Earth IDentifier). Woeid of Istanbul by default
  const [consolidatedWeather, setConsolidatedWeather] = useState([]);   //6 day weather report.

  useEffect(() => {
    if(location.coords.latitude ===-1 && location.coords.longitude ===-1){
      console.log("location not taken");
    }else{
      if(woeId !== 0){
        getWoeId(location.coords.latitude, location.coords.longitude, setWoeId);
      }
    }
  }, [location.coords.latitude, location.coords.longitude, woeId])

  useEffect(() => {
    getConsolidatedWeatherReport(woeId, setConsolidatedWeather);
  }, [woeId])

  console.log(consolidatedWeather)
  
  
  return (
    <div className={styles.container}>
      {/* left hand */}
      <div className={styles.leftSideContainer}>
        <BackgroundPattern />
        <ButtonsWrapper setLocation={setLocation} />
        <SummaryInfoWrapper />
      </div>

      {/* right hand */}
      <div className={styles.detailsFieldContainer}></div>
    </div>
  );
}

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

function ButtonsWrapper({setLocation}) {

  function searchForLocation(){
      window.navigator.geolocation.getCurrentPosition(setLocation, console.log)
  }

  return (
    <div className={styles.buttonsWrapper}>
      <motion.button
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

function SummaryInfoWrapper() {
  return (
    <div className={styles.summaryInfoContainer}>
      <motion.img
        whileHover={{ x: [0, -10, 10, 0] }}
        className={styles.todaysConditionImage}
        src={s}
        width={202}
        height={234}
        alt="daily weather icon"
      />
      <h5 className={styles.numericTemperature}>
        15<span className={styles.temperatureSymbol}>°C</span>
      </h5>
      <h5 className={styles.conditionTitle}>Shower</h5>
      <div className={styles.dateContainer}>
        <h5 className={styles.day}>Today</h5>
        <h5 className={styles.dot}>•</h5>
        <h5 className={styles.date}>Fri, 5 Jun</h5>
      </div>
      <h5 className={styles.place}>
        <Icon className={styles.markerIcon} size={1} path={mdiMapMarker} />{" "}
        Helsinki
      </h5>
    </div>
  );
}

export default App;
