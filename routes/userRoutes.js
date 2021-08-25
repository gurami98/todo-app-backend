const express = require('express')
const controllers = require('../controllers/userControllers')
const router = express.Router()
const auth = require('../middleware/auth')

const {registerUser, loginUser, welcomeUser} = controllers

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/welcome', auth, welcomeUser)
module.exports = router