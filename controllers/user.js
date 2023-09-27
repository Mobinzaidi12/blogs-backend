const User = require("../models/User");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
        const { userName, password, role } = req.body;
        const userExits = await User.findOne({ userName });
        if (userExits) {
            return res.status(400).json({ status: true, mes: "User already exits" })
        }
        let user = await User.create({ userName, password, role });
        user = user.toObject()

        return res.status(200).json({ status: true, user });
    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }
}

const loginUser = async (req, res) => {

    try {

        const { userName, password } = req.body;
        if (!userName && !password) {
            res.status(400).json({ status: false, mes: "Please provied Username and password " })
        }

        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid credentials" });
        }

        jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" }, (error, token) => {
            if (error) {
                return res.status(500).json({ status: false, message: "Failed to generate token" });
            }
            return res.cookie("token", token).json({ status: true, user, auth: token });
        })

    } catch (error) {
        res.status(500).send({ status: false, message: error });
        console.log(error)
    }

}



const profile = async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtKey, {}, (erro, info) => {
        if (erro) throw erro;
        res.json(info);
    });
};




module.exports = { registerUser, loginUser, profile }