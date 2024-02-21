const express = require('express');
const { createUser, getUserByEmail } = require('../models/users');
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs")

const router = express.Router();

// Route for account creation
router.post('/register', async (req, res, next) => {
  try {
    email = req.body.email;
    password = req.body.password;

    const user = await createUser(email, password);
    
    var user_id = user._id.toHexString()

    const token = createSecretToken(user_id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    // Respond with a success message or error message
    res.status(201).json({ message: 'User created successfully', success: true, user });
    next();
  } catch (error) {
    console.error('Error in user registration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res, next) => {
  try {

    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if(!email || !password ){
      return res.json({message: 'All fields are required'})
    }

    if(!user){
      return res.json({message: 'User does not exist' }) 
    }

    const auth = await bcrypt.compare(password, user.password)
    if (!auth) {
      return res.json({message: 'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     // returns that user has logged in successfully
     res.status(201).json({ message: "User logged in successfully", success: true });
     next()
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
