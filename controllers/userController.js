const User = require("../models/User")
const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

// ? registration
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
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
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    // * create the user
    const newUser = await new User({
        username,
        email,
        password: hashedPass,
    })
    // * save the user
    await newUser.save()

    res.json({
        status: true,
        message: "registration success",
        user: {
            username,
            email
        }
    })
})

// ? login
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(401)
        throw new Error("email and password are required")
    }
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error("user not found")
    }
    const isMatch =  await bcrypt.compare(password, user?.password)
    if (!isMatch) {
        res.status(401)
        throw new Error("invalid credentials")
    }

    // ? generate token
    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: "3d" })
    // ? save the token in browser cookies
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
    })

    res.json({
        status: true,
        message: "login success",
        user: {
            username: user.username,
            email: user.email,
        },
        token
    })
})

// ? logout
const logout = asyncHandler(async(req, res)=>{
    res.cookie("token", '', {maxAge: 1})
    res.status(200).json({
        message: "logout success",
    })
})

// ? profile
const userProfile = asyncHandler(async(req, res)=>{
    const foundUser = await User.findById(req.user).select("-password").populate({
    path: "history",
    select: "content createdAt"
  })
    if(foundUser){
        res.status(200).json({
            message: "user fetched",
            foundUser,
        })
    } else {
        res.status(404)
        throw new Error("user not found")
    }
})

// ? is authenticated 
const checkAuth = asyncHandler(async(req, res)=>{
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    if(!decoded){
        res.json({
            isAuthenticated: false,
        })
    } else {
        res.json({
            isAuthenticated: true,
        })
    }
})


module.exports = {
    register,
    login,
    logout,
    userProfile,
    checkAuth,
}