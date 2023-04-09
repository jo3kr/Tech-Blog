const router = require("express").Router();
const { Post, User } = require("../../models");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// gets all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["username"] }],
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new post
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(201).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates a post
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deletes a post
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    res.json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
