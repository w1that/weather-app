import React, { useEffect, useState } from "react";
import styles from "../styles/DayCard.module.css";
import { dateShortener, weatherIconSelector } from "../utils/utils";
import { motion } from "framer-motion";

export default function DayCard({ daysCondition, index }) {
  //   air_pressure: 1020.5
  // humidity: 61
  // id: 4802324645019648
  // max_temp: 19.935
  // min_temp: 9.620000000000001
  // the_temp: 18.240000000000002
  // visibility: 10.895433170285532
  // weather_state_abbr: "s"
  // weather_state_name: "Showers"
  // wind_direction_compass: "WSW"
  // wind_speed: 8.787753098830828

  const [src, setSrc] = useState("");
  useEffect(() => {
    weatherIconSelector(daysCondition.weather_state_abbr, setSrc);
  }, []);

  const [dayNumber, setDayNumber] = useState(0);
  const [dayName, setDayName] = useState("");
  const [monthName, setMonthName] = useState("");

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    const { today, dayName, monthName } = dateShortener();
    setDayNumber(today + index + 1);
    setMonthName(monthName);
    const todaysIndex = weekdays.indexOf(dayName);
    setDayName(weekdays[((todaysIndex + index) % weekdays.length) + 1]);
  }, []);

  return (
    <motion.div whileHover={{x:[0,10,-10,0]}} className={styles.container}>
      <div className={styles.innerContainer}>
      <h5 className={styles.date}>
        {index === 0
          ? "Tomorrow"
          : dayName.substring(0, 3) +
            ", " +
            dayNumber.toString() +
            " " +
            monthName.substring(0, 3)}
      </h5>
      <img width={56} height={62} alt="weather condition icon" src={src} />

      <div className={styles.temperaturesContainer}>
        <h5 className={styles.maxTemperature}>16°C</h5>
        <h5 className={styles.minTemperature}>11°C</h5>
      </div>
      </div>
    </motion.div>
  );
}
