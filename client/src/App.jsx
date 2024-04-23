import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import BookMarkPage from "./pages/bookmarkPage";
import MyStoriesPage from "./pages/myStoriesPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/notFoundPage";
import AddStory from "./modals/addStory/AddStory";

const App = () => {
  return (
    // <Routes>
    //   <Route path="/" element={<MainLayout />}>
    //     <Route index element={<HomePage />} />
    //     <Route path="/bookmarks" element={<BookMarkPage />} />
    //     <Route path="/my-stories" element={<MyStoriesPage />} />
    //     <Route path="*" element={<NotFoundPage />} />
    //   </Route>
    // </Routes>
    <AddStory />
  );
};

export default App;
