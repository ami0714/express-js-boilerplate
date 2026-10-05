const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
router.get('/tes', userController.getAllUsers);

router.use('/users', authMiddleware);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;