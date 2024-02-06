const express = require('express');
const { createUser } = require('../models/users');

const router = express.Router();

// Route for account creation
router.post('/register', async (req, res) => {
  try {
    email = req.body.email;
    password = req.body.password;

    await createUser(email, password);

    // Respond with a success message or redirect as needed
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in user registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
