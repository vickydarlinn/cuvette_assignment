import React, { useEffect, useState } from "react";
import StoryCard from "../storyCard";
import style from "./myStories.module.css";
import { backend_api } from "../../utils/constant";

const MyStories = () => {
  const [storiesData, setStoriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingStories, setPendingStories] = useState();

  const fetchStoriesFn = async (currentPage) => {
    const response = await fetch(
      `${backend_api}/users/stories?page=${currentPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { data } = await response.json();
    setStoriesData((prev) => [...prev, ...data.stories]);
    setPendingStories(data.totalStories - page * 4);
  };

  useEffect(() => {
    fetchStoriesFn(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <>
      {storiesData.length > 0 && (
        <section className={style.wrapper}>
          <h2 className={style.heading}>Your Stories</h2>

          {storiesData?.length > 0 ? (
            <div className={style.storiesWrapper}>
              {storiesData?.map((story) => (
                <StoryCard key={story._id} storyData={story} isMyStory={true} />
              ))}
            </div>
          ) : (
            <div className={style.storyNotFound}>No Stories Available</div>
          )}
          {pendingStories > 0 && (
            <button onClick={handleLoadMore}>See More</button>
          )}
        </section>
      )}
    </>
  );
};

export default MyStories;
