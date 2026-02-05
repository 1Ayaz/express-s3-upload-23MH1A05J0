const User = require('../models/User');

// Show login page
exports.getLogin = (req, res) => {
    res.render('login', { error: null });
};

// Handle login
exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid username or password' });
        }

        // Set session
        req.session.userId = user._id;
        req.session.username = user.username;

        res.redirect('/upload');
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'An error occurred during login' });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
        res.redirect('/login');
    });
};
