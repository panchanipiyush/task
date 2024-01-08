const router = require("express").Router();
const User = require("../model/user");
const PostUser = require("../model/postdata");

const bcrypt = require("bcryptjs")

const passport = require("passport");
require('../middleware/passport')(passport);


router.post("/registration", async (req, res) => {
    try {
        const data = new User(req.body)
        // console.log(data)
        const savedata = await data.save()
        res.send(savedata)
    } catch (error) {
        console.log(error);
    }
})

router.get("/getuser", async (req, res) => {

    try {
        const data = await User.find()
        res.send(data)
    } catch (error) {

    }
})

router.post("/login", async (req, res) => {
    try {
        // const email = req.body.email;
        // const pass = req.body.pass;
        const userdata = await User.findOne({ email: req.body.email })
        const isValid = await bcrypt.compare(req.body.pass, userdata.pass)
        // console.log(isValid);
        if (isValid) {
            // const token = await jwt.sign({ _id: userdata._id }, "thisismyloginwebtoken")
            const token = await userdata.generateToken();
            // console.log(token);
            res.send("Token  : " + token)
        }
        else {
            res.send("Invalid credentials !!!!")
        }
    } catch (error) {
        res.send("Invalid credentials !!!!")
    }
})

router.post("/postData",passport.authenticate('jwt',{session:false}),async (req, res) => {
    try {
        const user =   req.user
        console.log(user);
        const postData = new PostUser({
            title:req.body.title,
            body:req.body.body,
            createdby:user._id,
            isActive:req.body.isActive,
            latitude:req.body.latitude,
            longitude:req.body.longitude
        })
        const data = await postData.save()
        console.log(data);
        res.send(data)
    } catch (error) {
       res.send("invalid credentials")
    }
})

router.post("/LatLong", async (req, res) => {
        // const data = await PostUser.find()
            
    try {
        const postdata = await PostUser.find({latitude:req.body.latitude,longitude:req.body.longitude})
        console.log("ok");
        // if(data.latitude == req.body.latitude && data.longitude == req.body.longitude)
        // {   }
        res.send(postdata)
    } catch (error) {
        console.log(error);
    }
})

router.get("/status",async(req,res)=>{
    try {
        const getdata = await PostUser.find()
        // var dt = getdata.isActive
        // console.log(dt);
        var count = 0;
            for (let i = 0; i < getdata.length; i++) {
                if(getdata[i].isActive == true){
                    count++;
                }
            }
            var lengthOfgetData = getdata.length
            const inactive = Number(lengthOfgetData) - (count)
            // console.log("Active:-"+count);
            // console.log("inActive:-"+inactive);
        res.send(`active status = ${count}, inActive Status = ${inactive}`)

    } catch (error) {
        console.log(error);
    }
})

module.exports = router