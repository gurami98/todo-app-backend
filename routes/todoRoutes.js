const express = require('express')
const controllers = require('../controllers/todoControllers')
const router = express.Router()

const {getAllItems, addItem, updateItem, deleteItem} = controllers

router.get('/get-all', getAllItems)

router.post('/add', addItem)

router.put('/update-item/:id', updateItem)

router.delete('/delete-item/:id', deleteItem)

module.exports = router