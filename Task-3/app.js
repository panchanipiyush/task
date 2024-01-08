const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const DB_URL = "mongodb://127.0.0.1:27017/Task";
const PORT = 9000 || 3000;

mongoose.connect(DB_URL).then(() => {
    console.log("DB Connected");
})

app.use(express.json())
app.use(cookieparser())


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    pass: {
        type: String,
    },
    Tokens: [
        {
            token: {
                type: String
            }
        }
    ]
})

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    body: {
        type: String,
    },
    createdby: {
        type: mongoose.Schema.Types.ObjectId
    },
    isActive: {
        type: Boolean,
        default: false
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    }
})

UserSchema.pre("save", async function () {
    // console.log("okkk");
    try {
        if (this.isModified = "pass") {
            this.pass = await bcrypt.hash(this.pass, 10)
        }
    } catch (error) {
        console.log(error);
    }
})


const User = new mongoose.model("task", UserSchema)
const PostUser = new mongoose.model("post", postSchema)

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
app.post("/registration", async (req, res) => {
    try {
        const data = new User(req.body)
        // console.log(data)
        const savedata = await data.save()
        res.send(savedata)
    } catch (error) {
        console.log(error);
    }
})

app.get("/getuser", async (req, res) => {

    try {
        const data = await User.find()
        res.send(data)
    } catch (error) {

    }
})

app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.pass;
        const userdata = await User.findOne({ email: email })
        const isValid = await bcrypt.compare(pass, userdata.pass)
        if (isValid) {
            const token = await jwt.sign({ _id: userdata._id }, "thisismyloginwebtoken")
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

app.post("/postData", auth,async (req, res) => {
    try {
        const user =   req.user
        const postData = new PostUser({
            title:req.body.title,
            body:req.body.body,
            createdby:user._id,
            isActive:req.body.isActive,
            latitude:req.body.latitude,
            longitude:req.body.longitude
        })
        const data = await postData.save()
        res.send(data)
    } catch (error) {
       res.send("invalid credentials")
    }
})

app.post("/LatLong", async (req, res) => {
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

app.get("/status",async(req,res)=>{
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

app.listen(PORT, () => {
    console.log("Server running on PORT:" + PORT);
})