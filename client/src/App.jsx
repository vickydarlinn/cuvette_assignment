import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import BookMarkPage from "./pages/bookmarkPage";
import MainLayout from "./layouts/MainLayout";
import NotFoundPage from "./pages/notFoundPage";
import SingleStoryPage from "./pages/singleStoryPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/bookmarks" element={<BookMarkPage />} />
        <Route path="/stories/:id" element={<SingleStoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
