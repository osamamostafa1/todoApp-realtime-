const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todo.controller')

router.get('/', todoController.getTodos)
router.get('/:id', todoController.getTodo)
router.post('/', todoController.createTodo)
router.put('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deletetodo)

module.exports = router