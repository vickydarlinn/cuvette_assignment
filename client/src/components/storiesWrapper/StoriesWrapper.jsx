import React, { useEffect, useState } from "react";
import StoryCard from "../storyCard";
import style from "./storiesWrapper.module.css";
import { backend_api } from "../../utils/constant";

const StoriesWrapper = ({ category }) => {
  const [storiesData, setStoriesData] = useState([]);
  const fetchStoriesFn = async (category) => {
    const response = await fetch(
      `${backend_api}/stories/categories/${category}`
    );
    const { data } = await response.json();
    setStoriesData(data);
  };
  useEffect(() => {
    fetchStoriesFn(category);
  }, []);
  return (
    <section className={style.wrapper}>
      <h2 className={style.heading}>Top Stories about {category}</h2>

      {storiesData?.length > 0 ? (
        <div className={style.storiesWrapper}>
          {storiesData?.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className={style.storyNotFound}>No Stories Available</div>
      )}
    </section>
  );
};

export default StoriesWrapper;
