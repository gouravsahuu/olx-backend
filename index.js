const express = require("express");
const {connection} = require("./Configs/db");
const cors = require("cors");
const { connected } = require("process");
require("dotenv").config();
const {userRoute} = require("./Routes/user.route");
const {postRoute} = require("./Routes/post.route");
const port = process.env.port;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user",userRoute);
app.use("/product",postRoute);

app.get("/",(req,res) => {
    res.status(200).send({"message":"Welcome to OLX Backend"});
})

app.listen(port,async () => {
    try{
        await connection;
        console.log("connected to DB");
        console.log(`Server is running at port ${port}`)
    }
    catch(err){
        console.log(err.message);
    }
})