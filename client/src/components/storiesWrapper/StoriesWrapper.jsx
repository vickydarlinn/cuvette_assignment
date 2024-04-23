import React from "react";
import StoryCard from "../storyCard";
import style from "./storiesWrapper.module.css";

const StoriesWrapper = ({ data, heading }) => {
  return (
    <section className={style.wrapper}>
      <h2 className={style.heading}>Top Stories about {heading}</h2>

      {data?.length > 0 ? (
        data.map((story) => <StoryCard key={story.id} story={story} />)
      ) : (
        <div className={style.storyNotFound}>No Stories Available</div>
      )}
    </section>
  );
};

export default StoriesWrapper;
