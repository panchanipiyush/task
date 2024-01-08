const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    
    const token = req.header("auth-token")
    try {
        const data = await jwt.verify(token, "thisismyloginwebtoken")
        if (data) {
            const userdata = await User.findOne({ _id: data._id })
            req.user = userdata
            next();
        }
        else {
            res.send("Invalid token")
        }
    } catch (error) {
        res.send("Auth Error:- "+error)
    }
}


module.exports = auth;