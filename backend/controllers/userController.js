const User = require('../models/User');
const Post = require('../models/Post');

// Public user profile (optional – shows name, bio, email)
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update user (name or bio)
exports.updateUser = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio },
      { new: true }
    ).select('-password');
    console.log(updated);
    
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

/**
 * The name is kannu 👁️, saaaammiiiiiii Kannu 🔥😘

 */

// Delete user and their posts
exports.deleteUser = async (req, res) => {
  try {
    // Delete user
    await User.findByIdAndDelete(req.user.id);
    // Delete posts authored by user
    await Post.deleteMany({ author: req.user.id });

    res.json({ msg: 'Account and posts deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
