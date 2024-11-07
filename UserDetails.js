const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
    name: String,
    age: Number,
    mobilenumber:Number,
    email: String,
    password: String,
    image:String,
}, {
    collection: "User"
});
 module.exports=mongoose.model("User",userDetailSchema)
