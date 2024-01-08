var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var Users = require("./model/users")

module.exports = function (passport) {
    var params = {
        secretOrKey: 'secret',
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }


    passport.use(
        new JwtStrategy(params, function (jwt_payload, done) {
            let emailId = jwt_payload.email
            Users.findOne({ email: emailId }, function (err, user) {
                if (err) {
                    return next(err, false);
                }
                if (user) {
                    next(null, user)
                }
                else {
                    next(null, false)
                }
            })
        })
    );
}


