const express = require('express')
const controllers = require('../controllers/categoryControllers')
const router = express.Router()
const auth = require('../middleware/auth')

const {getAllCategories, addCategory} = controllers

router.get('/get-all', auth, getAllCategories)
router.post('/add', addCategory) // not sure if auth needed here, will see

module.exports = router