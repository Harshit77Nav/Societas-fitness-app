const mongoose = require("mongoose");

const customerSch = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    password:{type:String},
    color:{type:String},
    advise:{type:String}
})

const cusModel = mongoose.model("users",customerSch);

module.exports = cusModel;