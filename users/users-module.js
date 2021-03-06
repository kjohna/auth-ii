const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUserBy,
  getUsers,
  getUsersBy,
}

async function addUser(userData) {
  try {
    const [id] = await db('users').insert(userData);
    return id;
  } catch (error) {
    throw error;
  }
};

async function findUserBy(filter) {
  try {
    const userData = await db('users')
      .where(filter)
      .first();
    return userData;
  } catch (error) {
    throw error;
  }
}

async function getUsers() {
  try {
    const usersData = await db('users');
    return usersData;
  } catch (error) {
    throw error;
  }
}

async function getUsersBy(filter) {
  try {
    // console.log(filter);
    userData = await db('users')
      .where(filter);
    return userData;
  } catch (error) {
    throw error;
  }
}