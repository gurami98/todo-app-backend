const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
	text: {
		type: String,
		unique: true,
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
	}
})

const todoModel = mongoose.model("todoItem", todoSchema)

module.exports = todoModel