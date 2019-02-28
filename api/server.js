const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const server = express();

db = require('../data/dbConfig.js');
const Users = require('../users/users-module.js');

const secret = process.env.JWT_SECRET || 'test secret';

const errors = {
  '19': 'Username taken, pick a different one.'
}

server.use(helmet());
server.use(express.json());
server.use(cors());

const restricted = require('../auth/auth.js');

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

// endpoint to check that server works
server.get('', (req, res) => {
  res.status(200).json({ message: "Server WORKS." });
});

// endpoint to register a new user
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

// endpoint to log in an existing user
server.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userData = await Users.findUserBy({ username });
    // console.log(userData);
    if (userData && bcrypt.compareSync(password, userData.password)) {
      const token = generateToken({
        id: userData.id, 
        username: userData.username, 
        departments: userData.departments 
      });
      // console.log(token);
      res
        .status(200)
        .json({ 
          message: `Welcome, ${userData.username}!`,
          token,
        });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET route, protected: returns list of users if authorized
server.get('/api/users', restricted, async (req, res) => {
  try {
    const usersData = await Users.getUsers();
    res.status(200).json({ users: usersData });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;