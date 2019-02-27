// checks if token is valid
const jwt = require('jsonwebtoken');

function restricted(req, res, next) {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'test secret';

  if (token) {
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        // report this!
        res.status(401).json({ message: 'You shall not pass!' })
      } else {
        res.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Must log in to view this content." });
  }
}

module.exports = restricted;