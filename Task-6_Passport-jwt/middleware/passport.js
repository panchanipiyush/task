
const passport = require("passport")
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require("../model/user")

module.exports =
    // "abcdefghijklmnopqrstuvwxyz"
    function (passport) {
        var params = {
            secretOrKey: process.env.SECRETKEY,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        };

        // console.log(params.jwtFromRequest)
        passport.use(
            new JwtStrategy(params, function (jwt_payload, next) {
                let id = jwt_payload._id
                // console.log(id);

                User.findOne({ _id: id }, function (err, user) {
                    if (err) {
                        console.log("////////////" + err);
                        return next(err, false);
                    }
                    if (user) {
                        console.log("user------------" + user);
                        next(null, user)
                    }
                    else {
                        console.log("else**********" + err);
                        next(null, false)
                    }
                }
                )
            })
        );
    }



