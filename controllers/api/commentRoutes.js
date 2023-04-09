const router = require("express").Router();
const { Comment } = require("../../models");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Get all comments for a post
router.get("/post/:postId", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { post_id: req.params.postId },
    });
    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a comment
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }

    res.json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
