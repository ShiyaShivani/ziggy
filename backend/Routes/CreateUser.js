// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Your JWT secret key
// const jwtSecret = "munahahdjagdhsgfhfjsfdhjsfhnsbdhsghgh";

// router.post("/createuser", [
//   // Validation checks using express-validator
//   body('email').isEmail(),
//   body('name').isLength({ min: 5 }),
//   body('password', 'Incorrect Passcode').isLength({ min: 5 })
// ], async (req, res) => {
//   // Validation results
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const salt = await bcrypt.genSalt(10);
//     const secPassword = await bcrypt.hash(req.body.password, salt);

//     const newUser = await User.create({
//       name: req.body.name,
//       password: secPassword,
//       email: req.body.email,
//       location: req.body.location
//     });

//     res.status(201).json({ success: true, user: newUser });
//   } catch (error) {
//     console.error(error);

//     if (error.name === 'ValidationError') {
//       res.status(400).json({ success: false, error: 'Validation error', details: error.errors });
//     } else {
//       res.status(500).json({ success: false, error: 'Server error' });
//     }
//   }
// });

// // Login route with JWT authentication
// router.post("/loginuser", [
//   body('email').isEmail(),
//   body('password', 'Incorrect passcode').isLength({ min: 5 })
// ], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const email = req.body.email;

//   try {
//     const userData = await User.findOne({ email });

//     if (!userData) {
//       return res.status(400).json({ errors: "Try logging in with correct credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(req.body.password, userData.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ errors: "Try logging in with correct credentials" });
//     }

//     // Generate a JWT token
//     const payload = {
//       user: {
//         id: userData.id,
//       },
//     };

//     jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
//       if (err) throw err;
//       res.json({ success: true, authToken: token });
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;
