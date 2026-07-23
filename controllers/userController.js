const User = require("../models/User")
const bcrypt = require("bcrypt")

// ? registration
const register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        // * validate input
        if (!username || !email || !password) {
            res.status(400)
            throw new Error("username, email and password are required")
        }
        // * check if user already exists
        const exists = await User.findOne({ email })
        if (exists) {
            res.status(400)
            throw new Error("email already associated with an account")
        }
        // * hashing the password
        const salt = bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        // * create the user
        const newUser = await new User({
            username,
            email,
            password: hashedPass,
        })
        // * add the date when trial ends
        newUser.trialExpires = new Date(
            new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
        )
        // * save the user
        newUser.save()

        res.json({
            status: true,
            message: "registration success",
            user: {
                username,
                email
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    register
}