import { useState } from "react";
import style from "./storyCard.module.css";
import ShowStory from "../../modals/showStory";
import { MdDelete } from "react-icons/md";
import AddStory from "../../modals/addStory";

import { MdEdit } from "react-icons/md";

import { HiDotsVertical } from "react-icons/hi";

const StoryCard = ({ storyData, isMyStory = false }) => {
  const [isViewingStory, setIsViewingStory] = useState(false);
  const [isShowingBtn, setIsShowingBtn] = useState(false);
  const [isShowingStoryModal, setIsShowingStoryModal] = useState(false);

  console.log(storyData);

  const handleShowStory = () => {
    setIsViewingStory(true);
  };

  const handleShowBtn = (e) => {
    e.stopPropagation();
    setIsShowingBtn((prev) => !prev);
  };

  const handleEditingStory = (e) => {
    e.stopPropagation();
    setIsShowingStoryModal(true);
    setIsShowingBtn(false);
  };
  return (
    <>
      <div
        className={`${style.wrapper} `}
        onClick={handleShowStory}
        style={{
          backgroundImage: `linear-gradient(0deg, #000 20%, rgba(0, 0, 0, 0.00) 50%),
                      linear-gradient(180deg, #000 1%, rgba(0, 0, 0, 0.00) 20%), 
                      url(${storyData?.slides[0]?.image})`,
        }}
      >
        <div className={style.info}>
          <h3 className={style.heading}>{storyData?.slides[0]?.heading}</h3>
          <p className={style.description}>
            {storyData?.slides[0]?.description}
          </p>
        </div>
        {isMyStory && (
          <div className={style.seeMoreBtn} onClick={handleShowBtn}>
            <HiDotsVertical />
          </div>
        )}
        {isShowingBtn && (
          <div className={style.actionBtns}>
            <div className={style.btn} onClick={handleEditingStory}>
              <span>
                <MdEdit />
              </span>
              <span>Edit</span>
            </div>
            <div className={style.btn}>
              <span>
                <MdDelete />
              </span>
              <span>Delete</span>
            </div>
          </div>
        )}
      </div>
      {isViewingStory && (
        <ShowStory
          storyData={storyData}
          setIsViewingStory={setIsViewingStory}
        />
      )}
      {isShowingStoryModal && (
        <AddStory
          isOpen={isShowingStoryModal}
          handleIsOpen={setIsShowingStoryModal}
          storyData={storyData}
          isEditing={true}
        />
      )}
    </>
  );
};

export default StoryCard;
