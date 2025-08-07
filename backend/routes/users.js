const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const {
  updateUser,
  deleteUser,
  getUserProfile
} = require('../controllers/userController');

router.get('/:id', getUserProfile);          // Public profile view
router.put('/', protect, updateUser);        // Update name or bio
router.delete('/', protect, deleteUser);     // Delete own account

module.exports = router;