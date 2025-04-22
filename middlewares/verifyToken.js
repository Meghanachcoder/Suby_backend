 const Vendor= require("../models/Vendor")

 const jwt=require("jsonwebtoken")

const dotEnv=require("dotenv")
dotEnv.config();
const secretKey=process.env.WhatIsYourName
//firm add cheytaniki login aethay manam jwt token generate chesthunam kadha adhi check cheyali so ee middleware anedhi verify chesthundhi token ni 
//edhi middleware 

 const verifyToken= async(req,res,next)=>{
    //next anedhi middleware try catch lo em error lekapthe next ki vellamani chepthinattu
    //manaki headers lo token vunte danni token varaible ki assign chesukuntunam
    const token = req.headers.token;
    //okavela a token lekapthe error
    if(!token){
        return res.status(401).json({error:"Token is required"});
    }
    try{
        //manaki token anedhi encode ayyi vasthe danni decode chesthunam chesaka Vendor lo ah token vundho ledho check chetshunam  
      const decoded= jwt.verify(token, secretKey)
      const vendor= await Vendor.findById(decoded.vendorId);
    //okavela lekapothe not found ani error 
    if(!vendor){
        return res.status(404).json({error:"vendor not found"})
    }
      //manaki mongodb website lo id tho dinni compare chestunam 
      req.vendorId = vendor._id
      
      next()

    }catch(error){
    console.log(error)
    res.status(500).json({error:"Invalid jwt token"})

    }
 }

 module.exports= verifyToken