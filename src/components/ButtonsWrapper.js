import React from "react";
import { motion } from "framer-motion";
import { mdiCrosshairsGps } from "@mdi/js";
import Icon from "@mdi/react";
import styles from "../styles/ButtonsWrapper.module.css";

export default function ButtonsWrapper({ setLocation, setSearchFieldVisible }) {
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
