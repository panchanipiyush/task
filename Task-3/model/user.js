const mongoose = require("mongoose")


function addLastName(name){
    return 'Mr '+name;
}
function nameChange(params){
    return 'Mr'+params+'************';
}

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'User name is required'],
        unique: true,
        lowercase:true,
        trim:true,
        set:addLastName,
        get:nameChange,
    },
    email: {
        type: String,
        validate:{
            validator: function (val) {
                let condition = (val == "piyush@gmail.com")?false:true;
                return condition;
            },
            message: props= `${props.value} is not valid`
        }
    },
    department:{
        type:String
    },
    account:{
        mailID:String,
        age:{   
            type:Number
        },
        phone:Number
    }
})


const User = new mongoose.model("task" , UserSchema)

UserSchema.set('toObject',{getters:true});
UserSchema.set('toJSON',{getters:true});



module.exports = User