const express = require("express")
const app = express()
const PORT = 3000

app.get("/",(req,resp)=>{
    resp.send("Hello i am Runnig on port No:"+PORT)
})

app.listen(PORT,()=>{
    console.log("Server running on port : "+PORT);
})

/*   Mongoose Connectivity */

const mongoose = require("mongoose")

const dburl = "mongodb://127.0.0.1:27017/24jan";

mongoose.set('strictQuery', true)

mongoose.connect(dburl).then(() => {
    console.log("db conencted");
}).catch(err => {
    console.log(err);
})
