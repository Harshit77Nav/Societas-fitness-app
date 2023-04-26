const router = require("express").Router();
const cusModel = require("../model/customer");
const jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");
const dataModel = require("../model/data");
const expModel = require("../model/expert");
const dotenv = require("dotenv").config();

const secret = process.env.SECRET_KEY;

const verifyuser = async(req,res,next)=>{
    try {
        const token = req.headers["authorization"];
        if(!token){
            return res.json({
                status:"session expire"
            })
        }
        const user = jwt.verify(token,secret);
        if(user){
            next();
        }

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
}


router.post("/customer/signup", async(req,res)=>{
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        return res.json({
            status:"Enter all details"
        })
    }
    try {
        const userexist = await cusModel.findOne({email:email});
        if(userexist){
            return res.json({
                status:"User already exist try different email"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const user = await cusModel.create({
            name:name,
            email:email,
            password:hash
        })
        res.json({
            status:"successfull",
            user
        })

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.post("/customer/login", async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({
            status:"Enter all details"
        })
    }
    try {
        const user = await cusModel.findOne({email:email});
        const pass = await bcrypt.compare(password,user.password);
        if(pass == true){
            const token = jwt.sign({user},secret);
            res.json({
                status:"successfull",
                user:user.email,
                name:user.name,
                advise:user.advise,
                token,
                pass
            })
        }
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.patch("/customer/data", verifyuser, async(req,res)=>{
    try {
        const {email, date, reading, color, status, ideal, client} = req.body;
        const result = await dataModel.create({
            email:email,
            status:status,
            date:date,
            reading:reading,
            color:color,
            ideal:ideal,
            client:client
        })
        const customerColor = await cusModel.updateOne({email:email},{
            color:color
        })
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.get("/customer/data/:email", verifyuser, async(req,res)=>{
    try {
        const {email} = req.params;
        const result = await dataModel.find({email:email})
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})


router.post("/expert/signup", async(req,res)=>{
    const {name, email, password} = req.body;
    if(!email || !password || !name){
        return res.json({
            status:"Enter all details"
        })
    }
    try {
        const userexist = await expModel.findOne({email:email});
        if(userexist){
            return res.json({
                status:"User already exist try different email"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        const user = await expModel.create({
            name:name,
            email:email,
            password:hash
        })
        res.json({
            status:"successfull",
            user
        })

    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.post("/expert/login", async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.json({
            status:"Enter all details"
        })
    }
    try {
        const user = await expModel.findOne({email:email});
        const pass = await bcrypt.compare(password,user.password);
        if(pass == true){
            const token = jwt.sign({user},secret);
            res.json({
                status:"successfull",
                name:user.name,
                user:user.email,
                token,
                pass
            })
        }
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.get("/expert/data", verifyuser, async(req,res)=>{
    try {
        const result = await cusModel.find();
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

router.patch("/expert/advise", verifyuser, async(req,res)=>{
    try {
        const {email, advise} = req.body;
        const result = await cusModel.updateOne({email:email},{
            advise:advise
        })
        
        res.json({
            status:"successfull",
            result
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})




module.exports = router;