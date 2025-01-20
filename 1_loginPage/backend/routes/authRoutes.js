const express = require('express');
const { signup, login, forgotPassword, getUserByEmail } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/getUser',getUserByEmail)

module.exports = router;