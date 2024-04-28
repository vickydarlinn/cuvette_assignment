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

const ShowStory = ({ storyData, setIsViewingStory }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(storyData?.likes?.length || 0);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const isBookMarked = userInfo?.bookmarks?.some((id) => id === storyData?._id);

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
    try {
      const url = `${backend_api}/stories/toggle-bookmark/${id}`;
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { data } = await res.json();
      if (res.ok) {
        setUserInfo((prev) => ({ ...prev, bookmarks: data }));
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.prev} onClick={handlePrev}>
        Prev
      </div>
      <div
        className={style.modal}
        style={{
          backgroundImage: `
          linear-gradient(0deg, rgb(0 0 0 / 80%) 10%, rgb(0 0 0 / 0%) 80%, rgb(0 0 0) 100%), 
                    url(${storyData.slides[currentSlideIndex].image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className={style.social}>
          <div onClick={() => setIsViewingStory(false)}>Close</div>
          <div>Share</div>
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

      <div className={style.next} onClick={handleNext}>
        Next
      </div>
    </div>
  );
};

export default ShowStory;
