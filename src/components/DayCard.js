import React, { useEffect, useState } from "react";
import styles from "../styles/DayCard.module.css";
import { dateShortener, weatherIconSelector } from "../utils/utils";
import { motion } from "framer-motion";

export default function DayCard({ daysCondition, index }) {
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
    <motion.div
      whileHover={{ x: [0, 10, -10, 0] }}
      className={styles.container}
    >
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
          <h5 className={styles.maxTemperature}>
            {daysCondition.max_temp.toString().split(".", 1)[0]}°C
          </h5>
          <h5 className={styles.minTemperature}>
            {daysCondition.min_temp.toString().split(".", 1)[0]}°C
          </h5>
        </div>
      </div>
    </motion.div>
  );
}
