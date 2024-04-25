const Story = require("../models/storyModel");
const User = require("../models/userModel");

// Create a new story
exports.createStory = async (req, res) => {
  try {
    const { category, slides } = req.body;
    const author = req.user.id;
    if (slides.length < 3 || slides.length > 6) {
      return res.status(400).json({
        success: false,
        message: "A story must have between 3 and 6 slides",
        data: null,
      });
    }

    const newStory = new Story({
      category: category.toLowerCase(),
      slides,
      author,
    });

    await newStory.save();
    res.status(201).json({
      success: true,
      message: "Story created successfully",
      data: newStory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
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

// Fetch stories by category with pagination
exports.fetchStoriesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1; // Get page number from query parameter or default to 1
    const limit = 4; // Number of stories per page
    const skip = (page - 1) * limit; // Calculate how many documents to skip

    const count = await Story.countDocuments({ category });
    const stories = await Story.find({ category }).skip(skip).limit(limit);

    if (stories.length === 0 && count > 1) {
      return res.status(404).json({
        success: false,
        message: "No stories found for this category",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Stories filtered by category retrieved successfully",
      data: {
        stories,
        totalStories: count,
        currentPage: page,
      },
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

// Toggle bookmark on a story
exports.toggleBookmark = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  try {
    const story = await Story.findById(storyId);
    const user = await User.findById(userId);

    if (!story || !user) {
      return res.status(404).json({
        status: "error",
        message: "Story or user not found",
        data: null,
      });
    }
    const index = user.bookmarks.indexOf(storyId);
    if (index === -1) {
      user.bookmarks.push(storyId);
    } else {
      user.bookmarks.splice(index, 1);
    }
    await user.save();

    res.status(200).json({
      success: true,
      message: "Bookmark toggled successfully",
      data: user.bookmarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling bookmark",
      data: error.message,
    });
  }
};
// Toggle like on a story
exports.toggleLike = async (req, res) => {
  const storyId = req.params.id;
  const userId = req.user._id;

  try {
    const story = await Story.findById(storyId);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
        data: null,
      });
    }
    const index = story.likes.indexOf(userId);
    console.log(index);
    if (index === -1) {
      story.likes.push(userId);
    } else {
      story.likes.splice(index, 1);
    }
    await story.save();

    res.status(200).json({
      success: true,
      message: "Like toggled successfully",
      data: story.likes.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error toggling like",
      data: error.message,
    });
  }
};
