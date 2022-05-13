/* eslint-disable no-unused-vars */
import styles from "./styles/App.module.css";
import bgPattern from "./assets/patternCloudItem.png";
import { mdiCrosshairsGps } from "@mdi/js";
import { mdiMapMarker } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";
import { c, h, hc, hr, lc, lr, s, sl, sn, t } from "./assets/weatherIcons";
import { useEffect, useState } from "react";
import { getConsolidatedWeatherReport, getWoeId } from "./api/WeatherService";
import { dateShortener, weatherIconSelector } from "./utils/utils";

function App() {
  const fakeData = {
    consolidated_weather: [
      {
        id: 5719431427653632,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "WSW",
        min_temp: 9.620000000000001,
        max_temp: 19.935,
        the_temp: 18.240000000000002,
        wind_speed: 8.787753098830828,
        air_pressure: 1020.5,
        humidity: 61,
        visibility: 10.895433170285532,
      },
      {
        id: 6144972827918336,
        weather_state_name: "Heavy Cloud",
        weather_state_abbr: "hc",
        wind_direction_compass: "WSW",
        min_temp: 9.620000000000001,
        max_temp: 19.935,
        the_temp: 18.240000000000002,
        wind_speed: 8.787753098830828,
        air_pressure: 1020.5,
        humidity: 61,
        visibility: 10.895433170285532,
      },
      {
        id: 4802324645019648,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "WSW",
        min_temp: 9.620000000000001,
        max_temp: 19.935,
        the_temp: 18.240000000000002,
        wind_speed: 8.787753098830828,
        air_pressure: 1020.5,
        humidity: 61,
        visibility: 10.895433170285532,
      },
      {
        id: 6239248903569408,
        weather_state_name: "Light Rain",
        weather_state_abbr: "lr",
        wind_direction_compass: "WSW",
        min_temp: 9.620000000000001,
        max_temp: 19.935,
        the_temp: 18.240000000000002,
        wind_speed: 8.787753098830828,
        air_pressure: 1020.5,
        humidity: 61,
        visibility: 10.895433170285532,
      },
      {
        id: 5582022874497024,
        weather_state_name: "Showers",
        weather_state_abbr: "s",
        wind_direction_compass: "WSW",
        min_temp: 9.620000000000001,
        max_temp: 19.935,
        the_temp: 18.240000000000002,
        wind_speed: 8.787753098830828,
        air_pressure: 1020.5,
        humidity: 61,
        visibility: 10.895433170285532,
      },
      {
        id: 5849301172355072,
        weather_state_name: "Heavy Rain",
        weather_state_abbr: "hr",
        wind_direction_compass: "WSW",
        min_temp: 9.620000000000001,
        max_temp: 19.935,
        the_temp: 18.240000000000002,
        wind_speed: 8.787753098830828,
        air_pressure: 1020.5,
        humidity: 61,
        visibility: 10.895433170285532,
      },
    ],
    title: "London",
    time: "2022-05-13T18:03:48.746748+01:00",
  };

  const [location, setLocation] = useState({
    coords: { latitude: 51.506321, longitude: -0.12714 },
  }); //Istanbul by default
  const [woeId, setWoeId] = useState(44418); //used for taking 6 day weather report. (Where On Earth IDentifier). Woeid of Istanbul by default
  const [consolidatedWeather, setConsolidatedWeather] = useState({fakeData}); //6 day weather report.
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if(location.coords.latitude ===-1 && location.coords.longitude ===-1){
  //     console.log("location not taken");
  //   }else{
  //     if(woeId !== 0){
  //       getWoeId(location.coords.latitude, location.coords.longitude, setWoeId);
  //     }
  //   }
  // }, [location.coords.latitude, location.coords.longitude, woeId])

  // useEffect(() => {
  //   getConsolidatedWeatherReport(woeId, setConsolidatedWeather, setLoading);
  // }, [woeId])

  // if(loading){
  //   return <h1>loading</h1>
  // }

  return (
    <div className={styles.container}>
      <motion.div animate={{x:-2000, display:'none'}} transition={{x:{delay:1,duration:1}, display:{delay:3}}} style={{background:'black', width:'100%', height:'100vh', position:'absolute', zIndex:3, display:'flex', justifyContent:'center', alignItems:'center'}}>
      <h1 style={{fontFamily:'Raleway', color:'white', fontSize:46}}>WEATHER APP</h1>
    </motion.div>
      {/* left hand */}
      <div className={styles.leftSideContainer}>
        <BackgroundPattern />
        <ButtonsWrapper setLocation={setLocation} />
        <SummaryInfoWrapper
          todaysConsolidatedWeather={
            // consolidatedWeather.consolidated_weather[0]
            fakeData.consolidated_weather[0]
          }
          place={fakeData.title}
          // place={consolidatedWeather.title}
          // date={consolidatedWeather.time}
          date={fakeData.time}
        />
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

function ButtonsWrapper({ setLocation }) {
  function searchForLocation() {
    window.navigator.geolocation.getCurrentPosition(setLocation, console.log);
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

function SummaryInfoWrapper({ todaysConsolidatedWeather, place, date }) {
  const [src, setSrc] = useState("");
  
  const {dayName, monthName, today} = dateShortener();

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
        <h5 className={styles.date}>{dayName.substring(0,3)}, {today} {monthName.substring(0,4)}</h5>
      </div>
      <h5 className={styles.place}>
        <Icon className={styles.markerIcon} size={1} path={mdiMapMarker} />{" "}
        {place}
      </h5>
    </div>
  );
}

export default App;
