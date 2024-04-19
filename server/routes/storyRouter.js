const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const storyController = require("../controllers/storyController");

const router = express.Router();

router.post("/", authenticate, storyController.createStory);
router.put("/:id", authenticate, storyController.editStory);
router.get("/categories/:category", storyController.fetchStoriesByCategory);
router.get("/:id", storyController.getStoryById);
router.get(
  "/toggle-bookmark/:id",
  authenticate,
  storyController.toggleBookmark
);
router.get("/toggle-like/:id", authenticate, storyController.toggleLike);

module.exports = router;
