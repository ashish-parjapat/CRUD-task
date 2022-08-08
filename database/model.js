const mongoose = require("mongoose")
var schema=new mongoose.Schema({
    fname:{
        type: String,
        required:true

    },
    lname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
    gender : String,
    designation:{
        type:String,
        required:true
    },
    dateOfJoining :{
        type:Date,
        required:true
    },
    reportingManager :{
        type:String,
        required:true
    },
    employeeCode :{
        type:String,
        required:true
    },
    location :{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country :{
        type:String,
        required:true
    },
    department :{
        type:String,
        required:true
    },
    status: String,



})
const Employeedb = mongoose.model('employeedb', schema);
module.exports = Employeedb