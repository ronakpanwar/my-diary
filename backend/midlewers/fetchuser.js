const jwt = require('jsonwebtoken');
const JWT_SECRET = "villan@123";
const fetchuser = (req, res, next) => {
    // get the user from the JWT token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "authanticate with valid user token" })
    }
    try {

        const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;
            next();

    } catch (error) {
        res.send(401);
    }

}


module.exports = fetchuser;