const jwt = require('jsonwebtoken');

const secret = process.env.TOKEN_SECRET || 'brisket';
const expiration = process.env.TOKEN_EXP || '24h';

module.exports = {
	authMiddleware: function ({ req }) {
		// allows token to be sent via req.body, req.query, or headers
		let token = req.body.token || req.query.token || req.headers.authorization;

		// We split the token string into an array and return actual token
		if (req.headers.authorization) {
			token = token.split(' ').pop().trim();
		}

		if (!token) {
			return req;
		}

		// if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
		try {
			const { data } = jwt.verify(token, secret, { maxAge: expiration });
			console.log(`Data: ${data}`);
			req.user = data;
		} catch {
			console.log('Invalid token');
		}

		// return the request object so it can be passed to the resolver as `context`
		return req;
	},
	signToken: function ({ email, firstName, lastName, _id, homes, username }) {
		const payload = { email, firstName, lastName, _id, homes, username };
		console.log(payload);
		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
