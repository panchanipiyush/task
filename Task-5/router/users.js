
const router = require("express").Router();
const useCtrl = require("../controllers/userController")


var passport = require();
const passport = require("../config/passport")(passport);


router.get("/",(req,res)=>{
    res.send("Hello code passport jwt start")
})

router.get("/list",passport.authenticate('jwt',{session:false}),userCtrl.userList)

router.post("/add",userCtrl.userAdd);

router.post("/login",usrCtrl.userLogin)

module.exports = router;