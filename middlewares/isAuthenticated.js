const JWT = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
    try {

        const token = req.headers["x-access-token"];

        if(token) {
            JWT.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(401).json({success: false, message: error.message });
                }

                req.decoded = decoded;
                next();
            });
        } else {
            return res.status(403).json({success: false, message: "Acceso no autorizado" });
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: error.message});
    }
}

module.exports = {
    isAuthenticated
} 