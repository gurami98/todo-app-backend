const jwt = require("jsonwebtoken")
const config = process.env

const response = (res, code, payload) => {
	return res.status(code).json(payload)
}

const verifyToken = (req, res, next) => {
	const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"]
	if (!token) {
		return response(res,403, {message: 'A token is required for authentication'})
	}
	try {
		req.user = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
	} catch (err) {
		return response(res, 401, {message: 'Invalid Token'})
	}
	return next()
};

module.exports = verifyToken