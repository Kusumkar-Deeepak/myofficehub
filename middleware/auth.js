const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

// Middleware to verify JWT token
async function verifyToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.render('busmanagement/log');
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        console.log('Decoded Token:', decoded); // Log decoded token    

        req.enrollmentNo = decoded.enrollmentNo;
        req.username = decoded.username;
        next();
    });
}

module.exports = { verifyToken };
