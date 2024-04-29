import React from "react";
import { Link } from "react-router-dom";
import styles from "./notFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.wrapper}>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className={styles.goHomeBtn}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
