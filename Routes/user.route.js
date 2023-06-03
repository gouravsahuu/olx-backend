const express = require("express");
const {UserModel} = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRoute = express.Router();

userRoute.post("/register", async (req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await UserModel.find({email});
        if(existingUser.length == 0){
            bcrypt.hash(password, 5, async (err,hash) =>  {
                if(err){
                    res.status(400).send({"message" : err.message});
                }
                else{
                    let newUser = new UserModel({email,password:hash});
                    await newUser.save();
                    res.status(201).send({"message":"Signup Successful"})
                }
            })
        }
        else{
            res.status(400).send({"message" : "User already exists"});
        }
    }
    catch(err){
        res.status(400).send({"message":err.message});
    }
})

userRoute.post("/login",async (req,res) => {
    const {email,password} = req.body;
    try{
        const userExists = await UserModel.find({email});
        if(userExists.length > 0){
            bcrypt.compare(password, userExists[0].password, (err,result) => {
                if(result == true){
                    let token = jwt.sign({userID : userExists[0]._id}, process.env.key, { expiresIn: '1h' });
                    res.status(201).send({"message":"Login Successful", "token":token});
                }
                else if(result == false){
                    res.status(400).send({"message":"Invalid Credentials"});
                }
            })
        }
    }
    catch(err){
        res.status(400).send({"message":err.message});
    }
})

module.exports = {userRoute};