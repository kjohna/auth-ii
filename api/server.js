const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const server = express();

db = require('../data/dbConfig.js');

server.use(helmet());
server.use(express.json());

server.get('', (req, res) => {
  res.status(200).json({ message: "Server WORKS." });
});

module.exports = server;