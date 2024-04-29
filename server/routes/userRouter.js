const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", authenticate, userController.fetchUserDetails);
// router.get("/bookmarks", authenticate, userController.fetchBookmarkedStories);
router.get("/stories", authenticate, userController.fetchMyStories);

module.exports = router;
