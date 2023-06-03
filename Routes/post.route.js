const express = require("express");
const {PostModel} = require("../Models/post.model");
const postRoute = express.Router();

postRoute.get("/all",async(req,res) => {
    if(req.query.category && (req.query.category != "")){
        let cat = req.query.category;
        try{
            const queriedData = await PostModel.find({category:cat});
            res.status(200).send(queriedData);
        }
        catch(err){
            res.status(400).send({"message":err.message});
        }
    }
    else{
        try{
            const allData = await PostModel.find();
            res.status(200).send(allData);
        }
        catch(err){
            res.status(400).send({"message":err.message});
        }
    }
})

postRoute.post("/post",async(req,res) => {
    const {image,name,description,location,category,date,price} = req.body;
    try{
        const newPost = new PostModel({image,name,description,location,category,date,price});
        await newPost.save();
        res.status(201).send({"message":"Post Successfull"});
    }
    catch(err){
        res.status(400).send({"message":err.message});
    }
})

postRoute.delete("/:id",async(req,res) => {
    const id = req.params.id;
    try{
        await PostModel.findByIdAndDelete(id);
        res.send({"message":"Product Deleted Successfully"});
    }
    catch(err){
        res.status(400).send({"message":err.message});
    }
})

module.exports = {postRoute};