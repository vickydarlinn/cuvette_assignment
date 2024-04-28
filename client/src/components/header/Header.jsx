import { useState } from "react";
import styles from "./header.module.css";
import { isUserLoggedInState } from "../../atom";
import { useRecoilValue } from "recoil";
import RegisterModal from "../../modals/register";
import LoginModal from "../../modals/login";
import Authorized from "./authorized/Authorized";
import { Link } from "react-router-dom";

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
        <Link to="/" className={styles.logo}>
          SwipTory
        </Link>
        {isUserLoggedIn ? (
          <Authorized />
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
