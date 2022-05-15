import React, { useEffect, useState } from "react";
import { dateShortener, weatherIconSelector } from "../utils/utils";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiMapMarker } from "@mdi/js";
import styles from "../styles/SummaryInfoWrapper.module.css";

export default function SummaryInfoWrapper({
  todaysConsolidatedWeather,
  place,
  date,
}) {
  const [src, setSrc] = useState("");

  const { dayName, monthName, today } = dateShortener();

  useEffect(() => {
    weatherIconSelector(todaysConsolidatedWeather.weather_state_abbr, setSrc);
  }, [todaysConsolidatedWeather]);

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
