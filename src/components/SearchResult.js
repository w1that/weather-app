import React, { useState } from "react";
import { motion } from "framer-motion";
import { mdiChevronRight } from "@mdi/js";
import Icon from "@mdi/react";
import styles from '../styles/SearchResult.module.css'

export default function SearchResult({
  result,
  setSearchFieldVisible,
  setWoeId,
  setLoading,
  setLocation,
  fakeMode,
}) {
  const [arrowVisible, setArrowVisible] = useState(false);

  function handleSelectResult() {
    setSearchFieldVisible(false);
    setLoading(true);
    setWoeId(result.woeid);
    setLocation({
      coords: {
        latitude: result.latt_long.substring(0, result.latt_long.indexOf(",")),
        longitude: result.latt_long.substring(
          result.latt_long.indexOf(",") + 1,
          result.latt_long.length
        ),
      },
    });

    if (fakeMode) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }

  return (
    <motion.button
      whileHover={{ border: "1px solid #616475" }}
      onHoverStart={() => setArrowVisible(true)}
      onHoverEnd={() => setArrowVisible(false)}
      whileTap={{ scale: 0.9 }}
      onClick={handleSelectResult}
      className={styles.container}
    >
      {result.title}
      {arrowVisible ? (
        <Icon path={mdiChevronRight} size={1} color={"#616475"} />
      ) : (
        <Icon path={mdiChevronRight} size={1} color={"#1E213A"} />
      )}
    </motion.button>
  );
}
