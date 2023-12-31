const router = require('express').Router();
const auth = require('../middlewares/auth');

const { validateUser, validateUserID, validateUserAvatar } = require('../utils/validator');

const {
  getUser,
  getUsers,
  updateProfileInfo,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', auth, getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserID, getUser);
router.patch('/me', validateUser, updateProfileInfo);
router.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = router;
