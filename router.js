const bodyParser = require('body-parser')
const express = require('express')
const router=express.Router();
const axios = require('axios');
var Employeedb=require("./database/model");
 

//api to get data on the front page
router.get("/",function(req,res){
    axios.get("http://localhost:3000/api/employee/find")
    .then(function(response){
        console.log(response.data);
        res.render("index",{employee:response.data})
    })
    .catch(err=>{
        res.send(err)
    })
   
})
//api to add new employee into the database 
router.get("/employee/add",function(req,res){ res.render("addNewEmployee")});

// api to update the details of the employee
router.get("/employee-update",function(req,res){
    axios.get('http://localhost:3000/api/employees', { params : { id : req.query.id }})
    .then(function(userdata){
        res.render("./views/update.ejs", { employee : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
    
});

//api to craete the data and to store that in database

router.post("/api/employee",function(req,res){
    if(!req.body){
        res.status(400).send({
            message:"This field is required"
        });
        return;
    }
    const employee=new Employeedb({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        designation:req.body.designation,
        dateOfJoining:req.body.dateOfJoining,
        reportingManager :req.body.reportingManager,
        employeeCode:req.body.employeeCode,
        location:req.body.location,
    state:req.body.state,
    country:req.body.country,
    department:req.body.department,
    status:req.body.status
    });
    employee
    .save(employee)
    .then(data => {
        //res.send(data)
        res.send(data);
        // res.redirect('/employee/add');
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });

});

//api to find all the employee or the specific by id
router.get("/api/employee/find",function(req,res){
    if(req.query.id){
        const id = req.query.id;

        Employeedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
        }
            else{
                Employeedb.find()
                    .then(employee => {
                        res.send(employee)
                    })
                    .catch(err => {
                        res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
                    })
            }
        
            
        
        }

);
router.put("/api/employees/:id",function(req,res){
    if(!req.body){
        return res
        .status(400)
        .send({ message : "Data to update can not be empty"})

    }
    const id =req.params.id;
    Employeedb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"error while updating "
        })
    })
    
});
// api to delete the employee from the database
router.delete("/api/employees/delete/:id",function(req,res){
    const id = req.params.id;

    Employeedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
});















module.exports=router