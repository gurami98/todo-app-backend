const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const todoModel = require("./models/todo")
const cors = require('cors')



dotenv.config();

// app.use("/static", express.static('public'))
app.use(bodyParser.json())
app.use(cors())


const success = (res, payload) => {
	return res.status(200).json(payload)
}

app.get('/todos', async (req, res, next) => {
	try {
		const todos = await todoModel.find({})
		return success(res, todos)
	} catch (err) {
		next({ status: 400, message: "failed to get todos" })
	}
})

app.post('/todos', async (req, res, next) => {
	try {
		const todo = await todoModel.create(req.body)
		return success(res, todo)
	} catch (err) {
		next({ status: 400, message: "failed to create todo" })
	}
})

app.put('/todos/:id', async (req, res, next) => {
	try {
		const todo = await todoModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
		return success(res, todo)
	} catch (err) {
		next({ status: 400, message: "failed to update todo" })
	}
})


// app.delete('/todos/', async (req, res, next) => {
// 	try {
// 		await todoModel.deleteMany({_id: {$in: []}})
// 		return success(res, "all todos deleted!")
// 	} catch (err) {
// 		next({ status: 400, message: "failed to delete todo" })
// 	}
// })

app.delete('/todos/:id', async (req, res, next) => {
	try {
		await todoModel.findByIdAndRemove(req.params.id)
		return success(res, "todo deleted!")
	} catch (err) {
		next({ status: 400, message: "failed to delete todo" })
	}
})

app.use((err, req, res, next) => {
	return res.status(err.status || 400).json({
		status: err.status || 400,
		message: err.message || "there was an error processing request",
	})
})


mongoose.connect('mongodb+srv://dbAdmin:1998g22g05g@cluster0.abnuf.mongodb.net/TaskApp', {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, () => {
	console.log("Connected to db!");
	app.listen(3001, () => console.log("Server Up and running"));
});





