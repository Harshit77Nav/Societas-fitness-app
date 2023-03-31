const mongoose = require("mongoose");

const readingSch = mongoose.Schema({
    email:{type:String},
    status:{type:String},
    date:{type:String},
    reading:{type:Number},
    color:{type:String},
    ideal:{type:String}
})

const dataModel = mongoose.model("data",readingSch);

module.exports = dataModel;