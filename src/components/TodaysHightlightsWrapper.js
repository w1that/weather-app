import React from "react";
import styles from "../styles/TodaysHightlightsWrapper.module.css";
import { mdiNavigationVariant } from "@mdi/js";
import Icon from "@mdi/react";
import { motion } from "framer-motion";

export default function TodaysHightlightsWrapper({ consolidatedWeather }) {
  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Today's Hightlights</h5>
      <div className={styles.cardsContainer}>
        <div className={styles.aboveCardsContainer}>
          {/* wind card */}
          <div className={styles.windCard}>
            <h5 className={styles.cardTitle}>Wind status</h5>
            <h5 className={styles.speed}>
              {consolidatedWeather.wind_speed.toString().substring(0, 1)}
              <span className={styles.mph}>mph</span>
            </h5>
            <h5 className={styles.compass}>
              <span className={styles.arrowIconWrapper}>
                <Icon
                  className={styles.arrowIcon}
                  path={mdiNavigationVariant}
                  size={0.7}
                />
              </span>
              {consolidatedWeather.wind_direction_compass}
            </h5>
          </div>
          {/* humidity card */}
          <div className={styles.humidityCard}>
            <h5 className={styles.cardTitle}>Humidity</h5>
            <h5 className={styles.humidityPercentage}>
              {consolidatedWeather.humidity}
              <span className={styles.percent}>%</span>
            </h5>
            <div
              style={{
                width: 229,
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <label
                style={{ color: "#A09FB1", fontSize: 12, fontWeight: 700 }}
              >
                0
              </label>
              <label
                style={{ color: "#A09FB1", fontSize: 12, fontWeight: 700 }}
              >
                50
              </label>
              <label
                style={{ color: "#A09FB1", fontSize: 12, fontWeight: 700 }}
              >
                100
              </label>
            </div>
            <div className={styles.bar}>
              <motion.div
                whileHover={{ background: "#B7A948" }}
                style={{
                  height: "100%",
                  width: `${consolidatedWeather.humidity}%`,
                  background: "#FFEC65",
                  borderRadius: 80,
                }}
              ></motion.div>
            </div>
            <div
              style={{
                width: 229,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <label
                style={{
                  color: "#A09FB1",
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 4,
                }}
              >
                %
              </label>
            </div>
          </div>
        </div>

        <div className={styles.belowCardsContainer}>
          {/* visibility card */}
          <div className={styles.visibilityCard}>
            <h5 className={styles.cardTitle}>Visibility</h5>
            <h5 className={styles.windSpeed}>
              {consolidatedWeather.wind_speed.toString().substring(0, 1)}{" "}
              <span className={styles.miles}>miles</span>
            </h5>
          </div>
          {/* airPressureCard card */}
          <div className={styles.airPressureCard}>
            <h5 className={styles.cardTitle}>Air Pressure</h5>
            <h5 className={styles.airPressure}>
              {consolidatedWeather.air_pressure.toString().split(".", 1)[0]}{" "}
              <span className={styles.mb}>mb</span>
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
