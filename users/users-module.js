const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUserBy,
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