const User = require("../models/User");
const { tokenSign, decodeToken } = require("../utils/generateToken");

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "Todos los campos son requeridos" });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "El usuario no se encuentra en nuestros registros" });
        }

        const comparePassword = await User.comparePassword(password, user.password);

        if (!comparePassword) {
            return res.status(422).json({ message: "La contraseña es inválida" });
        }

        const tokenSession = tokenSign(user);

        return res.status(200).json({
            _id: user._id,
            accessToken: tokenSession,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // validate all fields request
        if (!username || !email || !password) {
            return res.status(422).json({ message: "Todos los campos son requeridos" });
        }

        // check if username exist in db
        const usernameExist = await User.findOne({ username: username });

        if (usernameExist) {
            return res.status(422).json({ message: "El usuario ya existe en la db" });
        }

        // check if email exist in db
        const emailExist = await User.findOne({ email: email });

        if (emailExist) {
            return res.status(422).json({ message: "El correo electrónico ya existe en la db" });
        }

        // create and save a new user
        const newUser = new User({
            username: username,
            email: email,
            password: User.encryptPassword(password)
        });

        const userSaved = await newUser.save();

        // generating user token
        const tokenSession = tokenSign(userSaved);

        return res.status(200).json({ 
            _id: userSaved._id,
            accessToken: tokenSession,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const logout = () => {
    try {
        
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const refreshToken = async (req, res) => {
    try {
        const { refreshToken, userId } = req.body;

        const decoded = decodeToken(refreshToken);

        if(decoded.id == userId) {
            const user = await User.findById(userId);

            if (user) {
                const tokenSession = tokenSign(user);
        
                return res.status(200).json({ 
                    _id: userId,
                    accessToken: tokenSession,
                    success: true
                });
            }
        }

        return res.status(401).json({ success: false, error: "Token inválido, intenta de nuevo" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signin,
    signup,
    logout,
    refreshToken
}