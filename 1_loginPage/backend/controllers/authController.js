const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser){
            return res.status(400).json({message : 'User with this email already exists'})
        }
        const user = new User({ email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send('User not found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.forgotPassword = async (req, res) => {
    // Implement forgot password functionality here
    res.send('Forgot password functionality is pending');
};

exports.getUserByEmail = async (req, res) => {
    const { email } = req.body; // Expecting email in the POST body
    try {
        const user = await User.findOne({ email }); // Query the database for the user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Exclude the password field from the response for security
        const { password, ...userData } = user._doc;
        res.status(200).json({ user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
