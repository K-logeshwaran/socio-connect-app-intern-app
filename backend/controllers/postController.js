const Post = require('../models/Post');
//const User = require('../models/User');

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const newPost = new Post({
      content,
      author: req.user.id
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all posts (public feed)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'name'); // Show only name
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get posts by user ID
exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate('author', 'name createdAt');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};


// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to delete this post' });
    }

    await post.deleteOne();


    res.json({ msg: 'Post deleted successfully' });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ msg: 'Server error' });
  }
};
