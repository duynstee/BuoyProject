// filepath: /backend/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key';

app.use(bodyParser.json());
app.use(cors());

const users = [
  { username: 'admin', password: 'groep3' },
  // Add more users as needed
];

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token.split('')[1], SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }
      req.userId = decoded.id;
      next();
    });
  }  

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});