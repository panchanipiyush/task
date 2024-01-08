const mongoose = require("mongoose");


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

const PostUser = new mongoose.model("post", postSchema);

module.exports = PostUser;

