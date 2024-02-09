const dbo = require("../db/conn");

// Require hashing solution
const bcrypt = require('bcryptjs')

async function createUser(email, password) {
    try {
    const db = await dbo.getDb();
    const usersCollection = db.collection('users');
    const existingUser = await usersCollection.findOne({
        $or: [{ email: email }],
    });

    if (existingUser) {
        console.log('1', email)
        console.log('Username or email already exists. Choose a different one.');
        return;
    }

      // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user document
    const newUser = {
        email: email,
        password: hashedPassword,
    };

    await usersCollection.insertOne(newUser);
    console.log(email)
    console.log("User account successfully created");
    } catch (error) {
        console.log( "Error creating user", error.message )
    }
}

module.exports = { createUser };
