const express = require('express')
const controllers = require('../controllers/todoControllers')
const router = express.Router()
const auth = require('../middleware/auth')

const {getAllItems, addItem, updateItem, updateEveryItem, deleteItem, deleteSelectedItems} = controllers

router.get('/get-all/:token', auth, getAllItems)

router.post('/add', addItem)

router.put('/update-item/all', updateEveryItem)

router.put('/update-item/:id', updateItem)

router.delete('/delete-item/selected', deleteSelectedItems)

router.delete('/delete-item/:id', deleteItem)

module.exports = router