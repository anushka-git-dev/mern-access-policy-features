import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true     
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "student"    //Types: student, lecturer, admin, remoteuser
    },
    isBlocked : {
        type : Boolean,
        required : true,
        default : false
    },
    img : {
        type : String,
        required : false,
        default : "https://avatar.iran.liara.run/public/boy?username=ash"
    }
});

const User_model = mongoose.model("users", userSchema);

export default User_model;


///user Details:
//email: anushkab@gmail.com, pwd: abc123, role: admin
//email: bimal@gmail.com, pwd: abc123, role: lecturer
//email: chamal@gmail.com, pwd: abc123, role: student
//email: dinesh@gmail.com, pwd: abc123, role: remoteuser