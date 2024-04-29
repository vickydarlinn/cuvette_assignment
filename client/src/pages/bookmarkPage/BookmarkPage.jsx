import StoryCard from "../../components/storyCard";
import style from "./bookmarkPage.module.css";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../atom";
import { Link } from "react-router-dom";

const BookMarkPage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const bookmarks = userInfo?.bookmarks;
  return (
    <div className={style.wrapper}>
      {bookmarks?.length > 0 ? (
        bookmarks?.map((story) => {
          return <StoryCard key={story._id} storyData={story} />;
        })
      ) : (
        <div className={style.noBookmark}>
          <p>No Bookmarks</p>
          <Link className={style.goHomeBtn} to="/">
            Go Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookMarkPage;
