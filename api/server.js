const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const server = express();

db = require('../data/dbConfig.js');
const Users = require('../users/users-module.js');

secret = process.env.JWT_SECRET || 'test secret';

const errors = {
  '19': 'Username taken, pick a different one.'
}

server.use(helmet());
server.use(express.json());
server.use(cors());

function generateToken(userData) {
  const payload = {
    subject: userData.id,
    username: userData.username,
    departments: userData.departments,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, secret, options);
}

server.get('', (req, res) => {
  res.status(200).json({ message: "Server WORKS." });
});

server.post('/api/register', async (req, res) => {
  const userData = req.body;
  
  if (userData.username && userData.password && userData.departments) {
    // hash user's pw, replace
    const hash = bcrypt.hashSync(userData.password, 2);
    userData.password = hash;
    // generate token
    const token = generateToken(userData);

    try {
      const userID = await Users.addUser(userData);
      res.status(201).json({ userID, token });
    } catch (error) {
      const msg = errors[error.errno] || error;
      res.status(500).json({ msg });
    }
  } else {
    res.status(400).json({ message: "Username, Password, Departments needed, please provide these." });
  }
});

module.exports = server;