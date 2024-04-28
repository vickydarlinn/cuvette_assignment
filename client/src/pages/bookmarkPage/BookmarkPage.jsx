import { useEffect, useState } from "react";
import { backend_api } from "../../utils/constant";
import StoryCard from "../../components/storyCard";
import style from "./bookmarkPage.module.css";

const BookMarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    fetchMyBookmarkedStories();
  }, []);

  const fetchMyBookmarkedStories = async () => {
    const url = `${backend_api}/users/bookmarks`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

    setBookmarks(data.data);
  };
  return (
    <div className={style.wrapper}>
      {bookmarks.length > 0 ? (
        bookmarks?.map((story) => {
          return <StoryCard key={story._id} storyData={story} />;
        })
      ) : (
        <h1>No Bookmarks</h1>
      )}
    </div>
  );
};

export default BookMarkPage;
