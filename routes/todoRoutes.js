const express = require('express')
const controllers = require('../controllers/todoControllers')
const router = express.Router()

router.get('/get-all', controllers.getAllItems)

router.post('/add', controllers.addItem)

router.put('/update-item/:id', controllers.updateItem)

router.delete('/delete-item/:id', controllers.deleteItem)

module.exports = router