import mongoose  from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
    type:Date ,
    default: Date.now ,
},

})

const UsersSchema = mongoose.model("user" ,UserSchema);

export default UsersSchema;