const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
	text: {
		type: String,
		unique: true,
		required: true
	}
})

const todoModel = mongoose.model("todoItem", todoSchema)

module.exports = todoModel