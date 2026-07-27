const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const isAuthenticated = asyncHandler(async (req, res, next) => {
    console.log("isAuthenticated middleware called");
    const token = req.cookies.token;
    if(token){
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded?.id
        // req.user = await User.findById(decoded?.id).select("-password") // * we are not storing the entire user object in the token, only the user id, so we need to fetch the user from the database
        // * we arre not using req.user.id because we are storing only the user id in the token, not the entire user object
    } else {
        res.status(401)
        throw new Error("user not authenticated")
    }
    next()
})

module.exports = isAuthenticated