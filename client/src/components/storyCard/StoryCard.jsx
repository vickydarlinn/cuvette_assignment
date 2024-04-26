import { useState } from "react";
import style from "./storyCard.module.css";
import ShowStory from "../../modals/showStory";

const StoryCard = ({ storyData }) => {
  const [isViewingStory, setIsViewingStory] = useState(false);

  const handleShowStory = () => {
    setIsViewingStory(true);
  };

  return (
    <>
      <div
        className={`${style.wrapper} `}
        onClick={handleShowStory}
        style={{
          backgroundImage: `linear-gradient(0deg, #000 20%, rgba(0, 0, 0, 0.00) 50%),
                      linear-gradient(180deg, #000 1%, rgba(0, 0, 0, 0.00) 20%), 
                      url(${"https://plus.unsplash.com/premium_photo-1680082510819-cace32f84aeb"})`,
        }}
      >
        <div className={style.info}>
          <h3 className={style.heading}>{"Lorem"}</h3>
          <p className={style.description}>
            {
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            }
          </p>
        </div>
      </div>
      {isViewingStory && (
        <ShowStory
          storyData={storyData}
          setIsViewingStory={setIsViewingStory}
        />
      )}
    </>
  );
};

export default StoryCard;
