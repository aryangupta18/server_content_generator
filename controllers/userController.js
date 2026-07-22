// ? registration
const register = async (req, res) => {
    res.json({
        status: true,
        message: "registration success"
    })
}

module.exports = {
    register
}