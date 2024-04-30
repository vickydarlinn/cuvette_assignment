import { useEffect, useState } from "react";
import styles from "./authorized.module.css";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import AddStoryModal from "../../../modals/addStory";
import { backend_api } from "../../../utils/constant";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../../atom";
import { toast } from "react-toastify";
import { isSmallScreen } from "../../../utils/utils";
import { autoLogout } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

const Authorized = () => {
  const navigate = useNavigate();
  const [isShowingAddStory, setIsShowingAddStory] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [isShowingMenubar, setIsShowingMenubar] = useState(false);
  const [isShowingProfile, setIsShowingProfile] = useState(false);
  const handleShowAddStoryModal = () => {
    setIsShowingAddStory(true);
    setIsShowingMenubar(false);
  };

  const fetchUserInfo = async () => {
    try {
      const url = `${backend_api}/users`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.status === 401) {
        autoLogout();
      }

      if (res.ok) {
        setUserInfo(data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      {isSmallScreen() ? (
        <div
          className={styles.mobileNavBtns}
          style={{ display: isShowingMenubar ? "flex" : "none" }}
        >
          <div className={styles.mobileUserProfile}>
            <span className={styles.mobileUserIcon}>
              {" "}
              <FaUserCircle />
            </span>
            <span>{userInfo?.username}</span>
          </div>
          <Link to="/bookmarks" className={`${styles.navBtn} ${styles.red}`}>
            {" "}
            <span className={styles.bookmark}>
              <FaBookmark />
            </span>
            <span>Bookmarks</span>
          </Link>
          <div
            onClick={handleShowAddStoryModal}
            className={`${styles.navBtn} ${styles.red}`}
          >
            Add story
          </div>
          <div
            className={`${styles.navBtn} ${styles.red}`}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      ) : (
        <div className={styles.navBtns}>
          <Link to="/bookmarks" className={`${styles.navBtn} ${styles.red}`}>
            {" "}
            <span className={styles.bookmark}>
              <FaBookmark />
            </span>
            <span>Bookmarks</span>
          </Link>
          <div
            onClick={handleShowAddStoryModal}
            className={`${styles.navBtn} ${styles.red}`}
          >
            Add story
          </div>
          <div className={styles.userProfile}>
            <FaUserCircle />
          </div>
          <div
            className={styles.menu}
            onClick={() => setIsShowingProfile((prev) => !prev)}
          >
            <GiHamburgerMenu />
          </div>
        </div>
      )}
      {isShowingProfile && (
        <div className={styles.profile}>
          <div className={styles.name}>{userInfo?.username}</div>
          <div
            className={`${styles.navBtn} ${styles.red}`}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
      {isSmallScreen() && (
        <div
          className={styles.menu}
          onClick={() => setIsShowingMenubar((prev) => !prev)}
        >
          <GiHamburgerMenu />
        </div>
      )}
      {isShowingAddStory && (
        <AddStoryModal
          isOpen={isShowingAddStory}
          handleIsOpen={setIsShowingAddStory}
        />
      )}
    </>
  );
};

export default Authorized;
