require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB');

        // Create a test user
        const testUser = new User({
            username: 'admin',
            password: 'admin123' // This will be hashed automatically
        });

        try {
            await testUser.save();
            console.log('Test user created successfully!');
            console.log('Username: admin');
            console.log('Password: admin123');
        } catch (error) {
            if (error.code === 11000) {
                console.log('User already exists!');
            } else {
                console.error('Error creating user:', error);
            }
        }

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
