const bodyParser = require('body-parser')
const express = require('express')


const port = process.env.PORT || 3000

const app = express()
const connectDB=require("./database/connection")





app.use(bodyParser.urlencoded({extended:true}));




app.set("view engine","ejs");

//connecting to the database

connectDB();



app.use(express.static("."));




app.use(express.static("public"));




//requirng and using router file
app.use("/",require("./router"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
