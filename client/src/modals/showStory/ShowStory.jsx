import { useEffect, useState } from "react";
import style from "./showStory.module.css";

const ShowStory = ({ storyData }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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
            // } else {
            //   setCurrentSlideIndex(0);
            //   return 0;
            // }
          }
          return prevProgress + increment;
        });
      }, 100);
    };

    startAnimation();

    return () => clearInterval(intervalId);
  }, [currentSlideIndex, storyData.slides.length]);

  return (
    <div className={style.wrapper}>
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

        <div className={style.info}>
          <h3 className={style.heading}>
            {storyData.slides[currentSlideIndex].heading}
          </h3>
          <p className={style.description}>
            {storyData.slides[currentSlideIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowStory;
