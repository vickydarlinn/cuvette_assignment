const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const storyController = require("../controllers/storyController");

const router = express.Router();

router.post("/", authenticate, storyController.createStory);
router.put("/:id", authenticate, storyController.editStory);
router.get("/bookmarks", authenticate, storyController.fetchBookmarkedStories);
router.get("/my-stories", authenticate, storyController.fetchMyStories);
router.get("/categories/:category", storyController.fetchStoriesByCategory);
router.get("/:id", storyController.getStoryById);

module.exports = router;
