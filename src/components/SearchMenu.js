import React from "react";
import { motion } from "framer-motion";
import { mdiMagnify, mdiWindowClose } from "@mdi/js";
import Icon from "@mdi/react";
import SearchResult from "./SearchResult";
import styles from "../styles/SearchMenu.module.css";

export default function SearchMenu({
  searchFieldVisible,
  setSearchInput,
  searchInput,
  resultData,
  setWoeId,
  setLoading,
  setLocation,
  setSearchFieldVisible,
  fakeMode,
}) {
  function handleSearchedLocation(e) {
    setSearchInput(e.target.value);
  }

  return (
    <motion.div
      animate={{ width: searchFieldVisible ? "100%" : "0%" }}
      transition={{ duration: 0.6 }}
      className={styles.searchMenuContainer}
    >
      <div className={styles.elementsWrapper}>
        <div className={styles.closeButtonContainer}>
          <motion.button
            onClick={() => setSearchFieldVisible(false)}
            className={styles.closeButton}
          >
            <Icon size={1.3} path={mdiWindowClose} color="#E7E7EB" />
          </motion.button>
        </div>
        <motion.div className={styles.contentWrapper}>
          {/* search bar and buttons div */}
          <motion.div className={styles.searchBarWrapper}>
            <motion.input
              onChange={(e) => handleSearchedLocation(e)}
              whileFocus={{ borderColor: "#3C47E9", borderRadius: 5 }}
              animate={{ display: searchFieldVisible ? "initial" : "none" }}
              transition={{ delay: searchFieldVisible ? 0.7 : 0 }}
              className={styles.searchInput}
              placeholder="search location"
              value={searchInput}
            ></motion.input>
            <motion.span
              transition={{ delay: searchFieldVisible ? 0.7 : 0 }}
              animate={{ display: searchFieldVisible ? "initial" : "none" }}
            >
              <Icon
                className={styles.searchIcon}
                path={mdiMagnify}
                size={1.5}
                color="#616475"
              />
            </motion.span>
            <motion.button
              animate={{ display: searchFieldVisible ? "initial" : "none" }}
              transition={{ delay: searchFieldVisible ? 0.7 : 0 }}
              whileHover={{ scaleX: 1.1, background: "#3741d5" }}
              className={styles.searchButton}
            >
              Search
            </motion.button>
          </motion.div>
          {/* search results */}
          <motion.div
            animate={{ display: searchFieldVisible ? "flex" : "none" }}
            transition={{ delay: searchFieldVisible ? 0.7 : 0 }}
            style={{
              width: "100%",
              height: "100vh",
              marginTop: 58,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {resultData.map((result) => {
              return (
                <SearchResult
                  setWoeId={setWoeId}
                  setLocation={setLocation}
                  setLoading={setLoading}
                  setSearchFieldVisible={setSearchFieldVisible}
                  result={result}
                  //add fake wait after api(!) call
                  fakeMode={fakeMode}
                />
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
