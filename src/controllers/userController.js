const userService = require('../services/userService');

async function getUsers(req, res, next) {
  try {
    const users = await userService.getUsers();
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
}

async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getUsers();
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
}

async function getUserById(req, res, next) {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ message: 'User ID must be a positive integer' });
    }

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, getUserById, getAllUsers };