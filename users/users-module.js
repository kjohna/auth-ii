const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  // getRoles,
}

async function addUser(userData) {
  try {
    const [id] = await db('users').insert(userData);
    return id;
  } catch (error) {
    throw error;
  }
};