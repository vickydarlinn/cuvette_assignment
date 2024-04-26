import React, { useEffect, useState } from "react";
import StoryCard from "../storyCard";
import style from "./storiesWrapper.module.css";
import { backend_api } from "../../utils/constant";

const StoriesWrapper = ({ category, name }) => {
  const [storiesData, setStoriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingStories, setPendingStories] = useState();

  const fetchStoriesFn = async (category, currentPage) => {
    const response = await fetch(
      `${backend_api}/stories/categories/${category}?page=${currentPage}`
    );
    const { data } = await response.json();
    setStoriesData((prev) => [...prev, ...data.stories]);
    setPendingStories(data.totalStories - page * 4);
  };

  useEffect(() => {
    fetchStoriesFn(category, page); // Pass the current page here
  }, [page]); // Add page as a dependency

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <section className={style.wrapper}>
      <h2 className={style.heading}>Top Stories about {name}</h2>

      {storiesData?.length > 0 ? (
        <div className={style.storiesWrapper}>
          {storiesData?.map((story) => (
            <StoryCard key={story._id} storyData={story} />
          ))}
        </div>
      ) : (
        <div className={style.storyNotFound}>No Stories Available</div>
      )}
      {pendingStories > 0 && <button onClick={handleLoadMore}>See More</button>}
    </section>
  );
};

export default StoriesWrapper;
