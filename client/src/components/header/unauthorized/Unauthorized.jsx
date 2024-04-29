import { useState } from "react";
import styles from "./unauthorized.module.css";
import RegisterModal from "../../../modals/register";
import LoginModal from "../../../modals/login";
import { GiHamburgerMenu } from "react-icons/gi";

const Unauthorized = () => {
  const [isShowingRegister, setIsShowingRegister] = useState(false);
  const [isShowingLogin, setIsShowingLogin] = useState(false);
  const [isShowingMenu, setIsShowingMenu] = useState(false);
  const handleRegister = () => {
    setIsShowingRegister(true);
    setIsShowingMenu(false);
  };

  const handleLogin = () => {
    setIsShowingLogin(true);
    setIsShowingMenu(false);
  };

  const handleShow = () => {
    setIsShowingMenu((prev) => !prev);
  };
  return (
    <>
      <div
        className={styles.navBtns}
        style={{
          display: isShowingMenu ? "flex" : "none",
        }}
      >
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
      <div className={styles.menu} onClick={handleShow}>
        <GiHamburgerMenu />
      </div>
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

export default Unauthorized;
