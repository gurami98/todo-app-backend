const jwt = require("jsonwebtoken");
const config = process.env;

const verifyToken = (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers["x-access-token"];
		console.log(req.body, req.query, req.headers)
	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}
	try {
		req.user = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = verifyToken;