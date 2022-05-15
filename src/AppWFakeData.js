/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./styles/App.module.css";
import DaysWrapper from "./components/DaysWrapper";
import TodaysHightlightsWrapper from "./components/TodaysHightlightsWrapper";
import LoadingScreen from "./components/LoadingScreen";
import SearchMenu from "./components/SearchMenu";
import BackgroundPattern from "./components/BackgroundPattern";
import ButtonsWrapper from "./components/ButtonsWrapper";
import SummaryInfoWrapper from "./components/SummaryInfoWrapper";

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
        min_temp: 9.300001,
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

  const fakeResultData = [
    {
      title: "Bristol",
      location_type: "City",
      woeid: 13963,
      latt_long: "51.453732,-2.591560",
    },
    {
      title: "Istanbul",
      location_type: "City",
      woeid: 2344116,
      latt_long: "41.040852,28.986179",
    },
    {
      title: "Christchurch",
      location_type: "City",
      woeid: 2348327,
      latt_long: "-43.527519,172.635422",
    },
  ];

  const [location, setLocation] = useState({
    coords: { latitude: 41.040852, longitude: 28.986179 },
  }); //Istanbul by default
  const [woeId, setWoeId] = useState(2344116); //used for taking 6 day weather report. (Where On Earth IDentifier). Woeid of Istanbul by default
  const [consolidatedWeather, setConsolidatedWeather] = useState({}); //6 day weather report.
  const [searchInput, setSearchInput] = useState("");
  const [searchFieldVisible, setSearchFieldVisible] = useState(false);
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(false);

  //remove input 3 seconds after clicking
  useEffect(() => {
    if (!searchFieldVisible) {
      setTimeout(() => {
        setSearchInput("");
      }, 300);
    }
  }, [searchFieldVisible]);

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
            fakeData.consolidated_weather[0]
          }
          place={fakeData.title}
          date={fakeData.time}
        />

        {/* if user presses search for places, this one comes. */}
        <SearchMenu
          resultData={fakeResultData}
          searchFieldVisible={searchFieldVisible}
          searchInput={searchInput}
          setLoading={setLoading}
          setLocation={setLocation}
          setSearchFieldVisible={setSearchFieldVisible}
          setSearchInput={setSearchInput}
          setWoeId={setWoeId}
          fakeMode={true}
        />
      </div>

      {/* right hand */}
      <div className={styles.detailsFieldContainer}>
        <div className={styles.detailsFieldInnerContainer}>
          <DaysWrapper
            nextFiveDaysConditions={fakeData.consolidated_weather.slice(
              1,
              6
            )}
          />
          <TodaysHightlightsWrapper
            consolidatedWeather={fakeData.consolidated_weather[0]}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

