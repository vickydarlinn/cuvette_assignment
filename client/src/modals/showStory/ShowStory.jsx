import { useEffect, useState } from "react";
import style from "./showStory.module.css";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { backend_api } from "../../utils/constant";
import { toast } from "react-toastify";
import ProgressBar from "./progressBar";
import { userInfoState } from "../../atom";
import { useRecoilState } from "recoil";
import { isSmallScreen } from "../../utils/utils";
import { RxCross1 } from "react-icons/rx";
import { FiSend } from "react-icons/fi";
import { isUserLoggedInState } from "../../atom";
import { useRecoilValue } from "recoil";
import { autoLogout } from "../../utils/utils";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const ShowStory = ({ storyData, setIsViewingStory }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(storyData?.likes?.length || 0);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const isBookMarked = userInfo?.bookmarks?.some(
    (bookmark) => bookmark._id === storyData?._id
  );
  const isUserLoggedIn = useRecoilValue(isUserLoggedInState);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (storyData?.likes?.some((id) => id === userId)) {
      setIsLiked(true);
    }
  }, []);

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
      setProgress(0);
    }
  };
  const handleNext = () => {
    if (currentSlideIndex < storyData.slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
      setProgress(0);
    }
  };
  const handleLike = async (id) => {
    if (!isUserLoggedIn) {
      toast.error("Please login to like the story");
      return;
    }
    try {
      const url = `${backend_api}/stories/toggle-like/${id}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 401) {
        autoLogout();
        toast.error("Please Login Again");
      }
      if (response.ok) {
        setTotalLikes(data.data);
        setIsLiked((prev) => !prev);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleBookmark = async (id) => {
    if (!isUserLoggedIn) {
      toast.error("Please login to bookmark the story");
      return;
    }
    try {
      const url = `${backend_api}/stories/toggle-bookmark/${id}`;
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
        toast.error("Please Login Again");
      }
      if (res.ok) {
        setUserInfo((prev) => ({ ...prev, bookmarks: data.data }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleModalClick = (e) => {
    const containerWidth = e.currentTarget.offsetWidth;
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;
    const clickPercentage = (clickX / containerWidth) * 100;

    if (clickY >= 70 && clickY <= 600) {
      if (clickPercentage <= 50) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <div className={style.wrapper}>
      {!isSmallScreen() && (
        <div className={style.prev} onClick={handlePrev}>
          <GrPrevious />
        </div>
      )}
      <div
        className={style.modal}
        onClick={(e) => handleModalClick(e)}
        style={{
          backgroundImage: `
          linear-gradient(0deg, rgb(0 0 0 / 80%) 10%, rgb(0 0 0 / 0%) 80%, rgb(0 0 0) 100%), 
                    url(${storyData.slides[currentSlideIndex].image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className={style.social}>
          <div
            className={style.closeIcon}
            onClick={() => setIsViewingStory(false)}
          >
            <RxCross1 />
          </div>
          <div className={style.shareIcon}>
            <FiSend />
          </div>
        </div>
        <ProgressBar
          storyData={storyData}
          setProgress={setProgress}
          currentSlideIndex={currentSlideIndex}
          setCurrentSlideIndex={setCurrentSlideIndex}
          progress={progress}
        />

        <div className={style.info}>
          <h3 className={style.heading}>
            {storyData.slides[currentSlideIndex].heading}
          </h3>
          <p className={style.description}>
            {storyData.slides[currentSlideIndex].description}
          </p>
          <div className={style.actions}>
            <div
              className={style.bookmark}
              onClick={() => handleBookmark(storyData?._id)}
            >
              {isBookMarked ? <FaBookmark /> : <FaRegBookmark />}
            </div>
            <div className={style.likes}>
              <span
                className={style.like}
                onClick={() => handleLike(storyData?._id)}
              >
                {isLiked ? <FaHeart /> : <FaRegHeart />}
              </span>
              <span>{totalLikes}</span>
            </div>
          </div>
        </div>
      </div>

      {!isSmallScreen() && (
        <div className={style.next} onClick={handleNext}>
          <GrNext />
        </div>
      )}
    </div>
  );
};

export default ShowStory;
