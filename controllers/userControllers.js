const userModel = require("../models/userSchema")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const response = (res, code, payload) => {
	return res.status(code).json(payload)
}

const registerUser = async (req, res) => {
	// Our register logic starts here
	try {
		// Get user input
		const {username, email, password} = req.body

		// Validate user input
		if (!(username && email && password)) {
			return response(res, 400, {message: 'All input is required'})
		}

		// check if user already exist
		// Validate if user exist in our database
		const oldUserWithUsername = await userModel.findOne({username})
		const oldUserWithEmail = await userModel.findOne({email})

		if (oldUserWithUsername || oldUserWithEmail) {
			return response(res, 409, {message: 'User Already Exist. Please Login'})
		}

		//Encrypt user password
		let encryptedPassword = await bcrypt.hash(password, 10)

		// Create user in our database
		const user = await userModel.create({
			username,
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		})

		// Create token
		// save user token
		const token = jwt.sign(
			{user_id: user._id, username, email, password},
			process.env.ACCESS_TOKEN_SECRET,
			{
				expiresIn: "15m",
			}
		)

		user.token = token
		return res.send(token)
	} catch (err) {
		return response(res, 400, {message: err.message})
	}
	// Our register logic ends here
}

const loginUser = async (req, res) => {
	// Our login logic starts here
	try {
		// Get user input
		const {username, password} = req.body

		// Validate user input
		if (!(username && password)) {
			return response(res, 400, {message: 'All input is required'})
		}
		// Validate if user exist in our database
		const user = await userModel.findOne({username})

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			// save user token
			const token = jwt.sign(
				{user_id: user._id, username, email: user.email, password},
				process.env.ACCESS_TOKEN_SECRET,
				{
					expiresIn: "15m",
				}
			)
			user.token = token
			res.send(token)
		}
		return response(res, 400, {message: 'Invalid Credentials'})
	} catch (err) {
		return response(res, 400, {message: err.message})
	}
}

const welcomeUser = async (req, res) => {
	res.status(200).send("Welcome 🙌 ")
}

module.exports = {registerUser, loginUser, welcomeUser}

