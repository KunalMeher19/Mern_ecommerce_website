const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const connect = require('../mongoConnect');
const jwt = require('jsonwebtoken');

const userCtrl = {
  register: async (req, res) => {
    try {
      // Connect to the database
      let conn = await connect();

      const { name, email, password } = req.body;

      // Check for missing fields
      if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
      }

      // Check if the email is already registered
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'Email already registered' });
      }

      // Ensure password is at least 6 characters long
      if (password.length < 6) {
        return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
      }

      // Password encryption
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new Users({ name, email, password: hashedPassword });

      // Save the user to the database
      await newUser.save();

      // Create JWT(json web token) tokens for authentication
      const accesstoken = createAccessToken({ id: newUser._id });
      const refreshtoken = createRefreshToken({ id: newUser._id });

      // Set refresh token as an HTTP-only cookie
      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token',
        secure: true, // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
      });

      // Respond with success message and access token
      res.json({ msg: 'Registration successful!', accesstoken });
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },

  refreshtoken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(401).json({ msg: 'No refresh token found. Please log in or register.' });
      }

      // Verify the refresh token
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(401).json({ msg: 'Invalid or expired refresh token. Please log in again.' });
        }

        // Create a new access token
        const accesstoken = createAccessToken({ id: user.id });
        res.json({ user, rf_token, accesstoken });
      });
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  },

  login: async (req, res) => {
    try {
      // Connect to the database
      let conn = await connect();

      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(401).json({ msg: "User does not exist" })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(401).json({ msg: "Incorrect password" })

      const accesstoken = createAccessToken({ id: user._id })
      const refreshtoken = createRefreshToken({ id: user._id })

      res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/user/refresh_token'
      })

      res.json({ msg: "Login Successful !!!", accesstoken })
    }
    catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('refreshtoken', {
        path: '/user/refresh_token'
      })
      return res.json({ msg: "Logged out successfully" })
    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      // Connect to the database
      let conn = await connect();

      const user = await Users.findById(req.user.id).select('-password');
      if (!user) return res.status(404).json({ msg: "User not found" })
      
      res.json(user);

    }
    catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

// Utility function to create an access token
const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
};

// Utility function to create a refresh token
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

module.exports = userCtrl;
