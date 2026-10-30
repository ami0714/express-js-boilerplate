const userQuery = require('../queries/userQuery');

function getUsers() {
  return userQuery.findAll();
}

function getUserById(id) {
  return userQuery.findById(id);
}

function getCurrentUser(id) {
  return userQuery.findById(id);
}

module.exports = { getUsers, getUserById,getCurrentUser };