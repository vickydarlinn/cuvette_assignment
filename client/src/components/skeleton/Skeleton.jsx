import React from "react";
import styles from "./skeleton.module.css";

const Skeleton = ({ width = "500px", height = "250px" }) => {
  return (
    <div
      className={styles.skeleton}
      style={{
        width: width,
        height: height,
      }}
    ></div>
  );
};

export default Skeleton;
