import styles from "./header.module.css";
import { isUserLoggedInState } from "../../atom";
import { useRecoilValue } from "recoil";
import Authorized from "./authorized";
import { Link } from "react-router-dom";
import Unauthorized from "./unauthorized";

const Header = () => {
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);

  return (
    <>
      <header className={styles.wrapper}>
        <Link to="/" className={styles.logo}>
          SwipTory
        </Link>
        {isUserLoggedIn ? <Authorized /> : <Unauthorized />}
      </header>
    </>
  );
};

export default Header;
