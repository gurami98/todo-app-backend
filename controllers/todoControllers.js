const todoModel = require("../models/todoSchema");

const success = (res, payload) => {
	return res.status(200).json(payload)
}

const getAllItems = async (req, res, next) => {
	try {
		const todos = await todoModel.find({})
		return success(res, todos)
	} catch (err) {
		next({ status: 400, message: "failed to get todos" })
	}
}

const addItem = async (req, res, next) => {
	try {
		const todo = await todoModel.create(req.body)
		return success(res, todo)
	} catch (err) {
		next({ status: 400, message: "failed to create todo" })
	}
}

const updateItem = async (req, res, next) => {
	try {
		const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
		return success(res, todo)
	} catch (err) {
		next({ status: 400, message: "failed to update todo" })
	}
}

const deleteItem = async (req, res, next) => {
	try {
		await todoModel.findByIdAndRemove(req.params.id)
		return success(res, "todo deleted!")
	} catch (err) {
		next({ status: 400, message: "failed to delete todo" })
	}
}

module.exports = {getAllItems, addItem, updateItem, deleteItem}