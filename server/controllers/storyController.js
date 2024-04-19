const Story = require("../models/storyModel");
const User = require("../models/userModel");

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const { category, slides } = req.body;
    const author = req.user.id;
    if (slides.length < 3 || slides.length > 6) {
      return res.status(400).json({
        status: "error",
        message: "A story must have between 3 and 6 slides",
        data: null,
      });
    }

    const newStory = new Story({
      category,
      slides,
      author,
    });

    await newStory.save();
    res.status(201).json({
      status: "success",
      message: "Story created successfully",
      data: newStory,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Server error while creating story",
      data: error.message,
    });
  }
};
// Edit an existing story
exports.editStory = async (req, res) => {
  try {
    const { category, slides } = req.body;
    const { id } = req.params;
    const author = req.user.id;

    const story = await Story.findOne({ _id: id, author: author });

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
        data: null,
      });
    }

    story.category = category || story.category;
    story.slides = slides || story.slides;

    await story.save();
    res.status(200).json({
      success: true,
      message: "Story updated successfully",
      data: story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while updating story",
      data: error.message,
    });
  }
};
// Fetch bookmarked stories
exports.fetchBookmarkedStories = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("bookmarks");
    res.status(200).json({
      success: true,

      message: "Bookmarked stories retrieved successfully",
      data: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: "Server error while fetching bookmarked stories",
      data: error.message,
    });
  }
};
// Fetch stories created by the user
exports.fetchMyStories = async (req, res) => {
  try {
    const stories = await Story.find({ author: req.user.id });
    res.status(200).json({
      success: true,
      message: "Stories retrieved successfully",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching user stories",
      data: error.message,
    });
  }
};
// Fetch stories by category
exports.fetchStoriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const stories = await Story.find({ category });

    res.status(200).json({
      success: true,
      message: "Stories filtered by category retrieved successfully",
      data: stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while fetching stories by category",
      data: error.message,
    });
  }
};
// Fetch a single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
        data: null,
      });
    }
    res.status(200).json({
      success: true,
      message: "Story retrieved successfully",
      data: story,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error while retrieving story",
      data: error.message,
    });
  }
};
