const { ObjectId } = require('mongodb');
const dbo = require("../db/conn");

// Require hashing solution
const bcrypt = require('bcryptjs')

async function createUser(email, password) {
    const saltRounds = 10;
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
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);

      // Create a new user document
    const newUser = {
        email: email,
        password: hashedPassword,
    };

    await usersCollection.insertOne(newUser);
    console.log(email)
    console.log("User account successfully created");
    return newUser
    } catch (error) {
        console.log( "Error creating user", error.message )
    }
}

async function getUserByEmail(email) {
    try {
        const db = await dbo.getDb();
        const usersCollection = db.collection('users');
        return await usersCollection.findOne({ email: email });
    } catch (error) {
        console.error("Error finding user by email:", error.message);
        throw error;
    }
}

async function getUserById(userId) {
    try {
        const db = await dbo.getDb();
        const usersCollection = db.collection('users');
        
        // Convert the userId string to an ObjectId
        const objectId = new ObjectId(userId);
        
        // Query the database using the ObjectId
        const user = await usersCollection.findOne({ _id: objectId });
        
        return user;
    } catch (error) {
        console.error("Error finding user by ID:", error.message);
        throw error;
    }
}

module.exports = { createUser, getUserByEmail, getUserById };
