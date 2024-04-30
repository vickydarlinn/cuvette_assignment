import React, { useEffect, useState } from "react";
import StoryCard from "../storyCard";
import style from "./storiesWrapper.module.css";
import { backend_api } from "../../utils/constant";
import { toast } from "react-toastify";
import Skeleton from "../skeleton";

const StoriesWrapper = ({ category, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [storiesData, setStoriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingStories, setPendingStories] = useState();

  const fetchStoriesFn = async (category, currentPage) => {
    setIsLoading(true);
    const response = await fetch(
      `${backend_api}/stories/categories/${category}?page=${currentPage}`
    );
    const data = await response.json();
    if (response.ok) {
      setStoriesData((prev) => [...prev, ...data.data.stories]);
      setPendingStories(data.data.totalStories - page * 4);
    } else {
      toast.error(data.message);
    }
    setIsLoading(false);
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

      {isLoading ? (
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Skeleton height={500} />
          <Skeleton height={500} />
          <Skeleton height={500} />
          <Skeleton height={500} />
        </div>
      ) : storiesData?.length > 0 ? (
        <div className={style.storiesWrapper}>
          {storiesData?.map((story) => (
            <StoryCard key={story._id} storyData={story} />
          ))}
        </div>
      ) : (
        <div className={style.storyNotFound}>No Stories Available</div>
      )}

      {pendingStories > 0 && (
        <div className={style.seeMore}>
          <button onClick={handleLoadMore}>See More</button>
        </div>
      )}
    </section>
  );
};

export default StoriesWrapper;
