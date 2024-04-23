import { useState } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { isUserLoggedInState } from "../../atom";
import { useRecoilValue } from "recoil";
import RegisterModal from "../../modals/register";
import LoginModal from "../../modals/login";

const Header = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);
  const [isShowingRegister, setIsShowingRegister] = useState(false);
  const [isShowingLogin, setIsShowingLogin] = useState(false);

  const handleRegister = () => {
    setIsShowingRegister(true);
  };

  const handleLogin = () => {
    setIsShowingLogin(true);
  };

  return (
    <>
      <header className={styles.wrapper}>
        <div className={styles.logo}>SwipTory</div>
        {isUserLoggedIn ? (
          <div className={styles.navBtns}>
            <Link to="/bookmarks" className={`${styles.navBtn} ${styles.red}`}>
              {" "}
              <span className={styles.bookmark}>
                <FaBookmark />
              </span>
              <span>Bookmarks</span>
            </Link>
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
            <div
              onClick={handleRegister}
              className={`${styles.navBtn} ${styles.red}`}
            >
              Register Now
            </div>
            <div
              onClick={handleLogin}
              className={`${styles.navBtn} ${styles.blue}`}
            >
              Sign In
            </div>
          </div>
        )}
      </header>

      {isShowingRegister && (
        <RegisterModal
          isOpen={isShowingRegister}
          handleIsOpen={setIsShowingRegister}
        />
      )}
      {isShowingLogin && (
        <LoginModal isOpen={isShowingLogin} handleIsOpen={setIsShowingLogin} />
      )}
    </>
  );
};

export default Header;
