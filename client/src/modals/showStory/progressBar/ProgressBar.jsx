import { useEffect } from "react";
import style from "./progressBar.module.css";

const ProgressBar = ({
  storyData,
  setProgress,
  currentSlideIndex,
  setCurrentSlideIndex,
  progress,
}) => {
  const duration = 15000 * storyData?.slides?.length || 3;

  useEffect(() => {
    let intervalId;

    const startAnimation = () => {
      const increment = 100 / (duration / 1000);

      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(intervalId);
            if (currentSlideIndex < storyData.slides.length - 1) {
              setCurrentSlideIndex((prevIndex) => prevIndex + 1);
              return 0;
            }
          }
          return prevProgress + increment;
        });
      }, 100);
    };

    startAnimation();

    return () => clearInterval(intervalId);
  }, [currentSlideIndex, storyData.slides.length]);
  return (
    <div className={style.progressBarContainer}>
      {storyData?.slides?.map((slide, index) => {
        const isActive = index === currentSlideIndex;
        return (
          <div
            key={index}
            className={`${style.progressBar}  ${
              index < currentSlideIndex ? style.progressBarCompleted : ""
            }`}
            style={{ "--progress": isActive ? progress / 100 : 0 }}
          ></div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
