const JWT = require("jsonwebtoken");

const tokenSign = (payload) => {
    return JWT.sign(
        {
            id: payload._id,
            username: payload.username,
            email: payload.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "5m"
        }
    )
}

const verifyToken = (token) => {
    try {
        return JWT.verify(token, process.env.JWT_SECRET);
    } catch (_err) {
        return undefined;
    }
}

const decodeToken = (token) => {
    return JWT.decode(token);
}

module.exports = {
    tokenSign,
    verifyToken,
    decodeToken,
}