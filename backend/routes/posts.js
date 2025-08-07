const router = require("express").Router();
const {
  createPost,
  getAllPosts,
  getPostsByUser,
  deletePost,
} = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createPost); // Create post
router.get("/", getAllPosts); // Get all posts (feed)
router.get("/user/:id", protect, getPostsByUser); // Get posts by user
router.delete("/:id", protect, deletePost);


module.exports = router;
