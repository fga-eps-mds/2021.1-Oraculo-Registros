const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers['x-access-token'];

    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token was provided.' });
    }

    return jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'It was not possible to authenticate the token.' });
        }

        req.userId = decoded.id;
        next();
        
        return undefined;
    });
}

module.exports = { verifyJWT };