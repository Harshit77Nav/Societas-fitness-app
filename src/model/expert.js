const mongoose = require("mongoose");

const expertSch = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String}
})

const expModel = mongoose.model("experts", expertSch);

module.exports = expModel;