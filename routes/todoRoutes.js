const express = require('express')
const controllers = require('../controllers/todoControllers')
const router = express.Router()

router.get('/todos', controllers.getAllItems)

router.post('/todos', controllers.addItem)

router.put('/todos/:id', controllers.updateItem)

router.delete('/todos/:id', controllers.deleteItem)

module.exports = router