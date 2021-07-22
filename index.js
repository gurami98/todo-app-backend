const express = require('express')
const app = express()
const todo = require('./routes/todoRoutes')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const cors = require('cors')

dotenv.config();

app.use(express.json())
app.use(cors())

app.use('/todo', todo)

mongoose.connect(process.env.DB_URL, {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, () => {
	console.log("Connected to db!");
	app.listen(3001, () => console.log("Server Up and running"));
});





