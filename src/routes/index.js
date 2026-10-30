const express = require('express');
const userController = require('../controllers/userController');
const testingController = require('../controllers/testingController');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});
router.post('/insert', testingController.insertNewUser);

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.use('/users', authMiddleware);
router.get('/users/current', userController.getCurrentUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);

module.exports = router;