const express = require('express')
const app = express()
const todo = require('./routes/todoRoutes')
const user = require('./routes/userRoutes')
const category = require('./routes/categoryRoutes')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const cors = require('cors')
const port = process.env.PORT || 3001

dotenv.config()

app.use(express.json())
app.use(cors())

app.use('/todo', todo)
app.use('/user', user)
app.use('/category', category)

mongoose.connect(process.env.DB_URL, {
	keepAlive: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}, () => {
	console.log("Connected to db!")
	app.listen(port, () => console.log(`Server Up and running on port ${port}`))
});





