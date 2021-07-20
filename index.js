const express = require('express')
const app = express()
const router = require('./routes/todoRoutes');
const bodyParser = require("body-parser")
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const cors = require('cors')

dotenv.config();

app.use(bodyParser.json())
app.use(cors())

app.use('/todo', router)

app.use((err, req, res, next) => {
	return res.status(err.status || 400).json({
		status: err.status || 400,
		message: err.message || "there was an error processing request",
	})
})

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





