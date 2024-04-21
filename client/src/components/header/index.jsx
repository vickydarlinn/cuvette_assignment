import styles from "./header.module.css";
import { FaBookmark } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const isUserLoggedIn = true;
  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>SwipTory</div>
      {isUserLoggedIn ? (
        <div className={styles.navBtns}>
          <div className={`${styles.navBtn} ${styles.red}`}>
            {" "}
            <span className={styles.bookmark}>
              <FaBookmark />
            </span>
            <span>Bookmarks</span>
          </div>
          <div className={`${styles.navBtn} ${styles.red}`}>Add story</div>
          <div className={styles.userProfile}>
            <FaUserCircle />
          </div>
          <div className={styles.menu}>
            <GiHamburgerMenu />
          </div>
        </div>
      ) : (
        <div className={styles.navBtns}>
          <div className={`${styles.navBtn} ${styles.red}`}>Register Now</div>
          <div className={`${styles.navBtn} ${styles.blue}`}>Sign In</div>
        </div>
      )}
    </header>
  );
};

export default Header;
