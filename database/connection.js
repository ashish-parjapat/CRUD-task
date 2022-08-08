//connectiong to database
const mongoose = require("mongoose")

 const connectDB=async()=>{
    try{
        const con=await mongoose.connect("mongodb+srv://Ashish-Kumar:ankit1234@cluster0.wic6nwz.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser:true
        
    })
    console.log(`MongoDB connected  successfuly: ${con.connection.host}`);
}catch(err){
    console.log(err);
    process.exit(1);
}
}

module.exports = connectDB