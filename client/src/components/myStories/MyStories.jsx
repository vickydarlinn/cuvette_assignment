import React, { useEffect, useState } from "react";
import StoryCard from "../storyCard";
import style from "./myStories.module.css";
import { backend_api } from "../../utils/constant";
import { autoLogout } from "../../utils/utils";
import Skeleton from "../skeleton";

const MyStories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [storiesData, setStoriesData] = useState([]);
  const [page, setPage] = useState(1);
  const [pendingStories, setPendingStories] = useState();

  const fetchStoriesFn = async (currentPage) => {
    setIsLoading(true);
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
    const data = await response.json();
    if (response.status === 401) {
      autoLogout();
    }
    if (response.ok) {
      setStoriesData((prev) => [...prev, ...data.data.stories]);
      setPendingStories(data.data.totalStories - page * 4);
    }
    setIsLoading(false);
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

          {isLoading ? (
            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Skeleton height={500} width={275} />
              <Skeleton height={500} width={275} />
              <Skeleton height={500} width={275} />
              <Skeleton height={500} width={275} />
            </div>
          ) : storiesData?.length > 0 ? (
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
