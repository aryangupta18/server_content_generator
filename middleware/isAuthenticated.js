const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded?.id
        // req.user = await User.findById(decoded?.id).select("-password")
        // * we arre not using req.user.id because we are storing only the user id in the token, not the entire user object
    } else {
        res.status(401)
        throw new Error("user not authenticated")
    }
    return next()
})

module.exports = isAuthenticated