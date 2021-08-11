const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

const response = (res, code, payload) => {
	return res.status(code).json(payload)
}

const registerUser = async (req, res) => {
	// Our register logic starts here
	try {
		// Get user input
		const {email, password} = req.body;
		console.log('test')

		// Validate user input
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}

		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await userModel.findOne({email});

		if (oldUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}

		//Encrypt user password
		let encryptedPassword = await bcrypt.hash(password, 10);

		// Create user in our database
		const user = await userModel.create({
			email: email.toLowerCase(), // sanitize: convert email to lowercase
			password: encryptedPassword,
		});

		// Create token
		// save user token
		user.token = jwt.sign(
			{user_id: user._id, email},
			process.env.TOKEN_KEY,
			{
				expiresIn: "2h",
			}
		);

		// return new user
		res.status(201).json(user);
	} catch (err) {
		return response(res, 400, {message: err.message})
	}
	// Our register logic ends here
}

const loginUser = async (req, res) => {
	// Our login logic starts here
	try {
		// Get user input
		const {email, password} = req.body;

		// Validate user input
		if (!(email && password)) {
			res.status(400).send("All input is required");
		}
		// Validate if user exist in our database
		const user = await userModel.findOne({email});

		if (user && (await bcrypt.compare(password, user.password))) {
			// Create token
			// save user token
			user.token = jwt.sign(
				{user_id: user._id, email},
				process.env.TOKEN_KEY,
				{
					expiresIn: "2h",
				}
			);

			// user
			res.status(200).json(user);
		}
		res.status(400).send("Invalid Credentials");
	} catch (err) {
		return response(res, 400, {message: err.message})
	}
}

const welcomeUser = async (req, res) => {
	res.status(200).send("Welcome 🙌 ");
}

module.exports = {registerUser, loginUser, welcomeUser}

