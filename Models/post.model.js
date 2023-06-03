const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    image : {type:String,required:true},
    name : {type:String,required:true},
    description : {type:String,required:true},
    location : {type:String,required:true},
    category : {type:String,required:true},
    date : {type:Date,required:true},
    price : {type:Number,required:true}
})

const PostModel = mongoose.model("post",postSchema);

module.exports = {PostModel};