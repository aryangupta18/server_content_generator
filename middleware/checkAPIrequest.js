const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const checkAPIrequest = asyncHandler(async (req, res, next) => {
    const findUser = await User.findById(req.user);
    if (!findUser) {
        res.status(404);
        throw new Error("User not found");
    }

    let requests = 0
    if (findUser.isTrialActive) {
        requests = findUser.apiRequestCount;
    }

    if (requests >= monthlyRequestCount) {
        res.status(403);
        throw new Error("API request limit exceeded. Please upgrade your plan.");
    }
    next()
})

module.exports = checkAPIrequest