const todoModel = require("../models/todoSchema");

const response = (res, code, payload) => {
	return res.status(code).json(payload)
}

const getAllItems = async (req, res) => {
	try {
		const todos = await todoModel.find({})
		return response(res, 200, todos)
	} catch (err) {
		return response(res, 400, { message: "failed to get todos" })
	}
}

const addItem = async (req, res) => {
	console.log(req.body)
	try {
		const todo = await todoModel.create(req.body)
		return response(res, 200, todo)
	} catch (err) {
		return response(res, 400, { message: "This item already exists!" })
	}
}

const updateItem = async (req, res) => {
	try {
		const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body)
		return response(res,200, todo)
	} catch (err) {
		return response(res, 400, { message: "failed to update todo" })
	}
}

const deleteItem = async (req, res) => {
	try {
		await todoModel.findByIdAndRemove(req.params.id)
		return response(res, 200,"todo deleted!")
	} catch (err) {
		return response(res, 400, { message: "failed to delete todo" })
	}
}

module.exports = {getAllItems, addItem, updateItem, deleteItem}