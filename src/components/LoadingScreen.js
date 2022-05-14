import React from "react";
import styles from "../styles/LoadingScreen.module.css";

export default function LoadingScreen() {
  return (
    <div animate={{ opacity: 1 }} className={styles.loading}>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          width={100}
          src="https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/umbrella-wind-alt.svg"
          alt="upturned umbrella"
        />
        <h5 style={{ fontSize: 24 }}>LOADING</h5>
      </span>
    </div>
  );
}
