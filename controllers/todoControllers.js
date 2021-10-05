const todoModel = require("../models/todoSchema");

const response = (res, code, payload) => {
	return res.status(code).json(payload)
}

const getAllItems = async (req, res) => {
	try {
		let todos = await todoModel.find({})
		todos = todos.filter(todo => todo.user === req.user.username)
		return response(res, 200, todos)
	} catch (err) {
		return response(res, 400, {message: "failed to get todos"})
	}
}

const addItem = async (req, res) => {
	try {
		const todo = await todoModel.create(req.body)
		return response(res, 200, todo)
	} catch (err) {
		return response(res, 400, {message: "This todo text already exists!"})
	}
}

const updateItem = async (req, res) => {
	try {
		const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body)
		return response(res, 200, todo)
	} catch (err) {
		return response(res, 400, {message: "failed to update todo"})
	}
}

const updateEveryItem = async (req, res) => {
	try {
		const todos = await todoModel.updateMany({user: req.user.username}, req.body.status)
		return response(res, 200, todos)
	} catch (err) {
		return response(res, 400, {message: "failed to update all todos"})
	}
}

const deleteItem = async (req, res) => {
	try {
		await todoModel.findByIdAndRemove(req.params.id)
		return response(res, 200, "todo deleted!")
	} catch (err) {
		return response(res, 400, {message: "failed to delete todo"})
	}
}

const deleteSelectedItems = async (req, res) => {
	try {
		await todoModel.deleteMany({user: req.user.username, done: true})
		return response(res, 200, "selected todos deleted")
	} catch (err) {
		return response(res, 400, {message: "failed to delete selected todos"})
	}
}

module.exports = {getAllItems, addItem, updateItem, updateEveryItem, deleteItem, deleteSelectedItems}