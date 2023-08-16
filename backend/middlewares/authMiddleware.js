
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;
const requireSignIn = (req, res, next) => {
    let token;
    console.log(req.headers)
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    try {
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log('Cant decode token')
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = requireSignIn;
