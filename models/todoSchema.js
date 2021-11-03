const mongoose = require('mongoose');
const {Schema} = require("mongoose");
const todoSchema = new mongoose.Schema({
	text: {
		type: String,
		// unique: true,
		unique: false,
		required: true
	},
	taskCategory: {
		type: String,
		required: true
	},
	dueDate: {
		type: String,
		required: true
	},
	timeAdded: {
		type: String,
		required: true
	},
	priority: {
		type: Number,
		required: true
	},
	done: {
		type: Boolean,
		required: true
	},
	user: {type: Schema.Types.String, ref: 'user'}
})

const todoModel = mongoose.model("todoItem", todoSchema)

module.exports = todoModel
