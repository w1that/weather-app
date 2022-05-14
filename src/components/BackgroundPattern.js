import React from "react";
import styles from "../styles/BackgroundPattern.module.css";
import { motion } from "framer-motion";
import bgPattern from "../assets/patternCloudItem.png";

export default function BackgroundPattern() {
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
