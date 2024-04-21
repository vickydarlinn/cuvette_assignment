import React from "react";
import style from "./storyCard.module.css";

const StoryCard = ({ imageUrl, heading, description }) => {
  return (
    <div
      className={`${style.wrapper} `}
      style={{
        backgroundImage: `linear-gradient(0deg, #000 20%, rgba(0, 0, 0, 0.00) 50%),
                      linear-gradient(180deg, #000 1%, rgba(0, 0, 0, 0.00) 20%), 
                      url(${
                        imageUrl
                          ? imageUrl
                          : "https://plus.unsplash.com/premium_photo-1680082510819-cace32f84aeb"
                      })`,
      }}
    >
      <div className={style.info}>
        <h3 className={style.heading}>{heading ? heading : "Lorem"}</h3>
        <p className={style.description}>
          {description
            ? description
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."}
        </p>
      </div>
    </div>
  );
};

export default StoryCard;
