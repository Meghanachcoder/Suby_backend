// manam models lo create chesina Vendor.js lo vendor schema lo enni records aena store cheyochu vatini database lo store cheytaniki ee vendorContoller.js and vendorRoutes.js use chestham 
const Vendor = require("../models/Vendor");
const jwt=require("jsonwebtoken");
const bcrypt= require('bcrypt')
const dotEnv= require("dotenv")
//jwt ni username authentication kosam and bcrypt anedanni password ni encyprt cheyataniki use chesthunam 

dotEnv.config(); 

const secretKey=process.env.WhatIsYourName

//manaki databse lo vachina username , password , email ni register chesi save cheyataniki edhi 
const vendorRegister= async(req, res)=>{
    const {username, email, password}= req.body;
    try{
     // email anedhi unique ga vundali kabbati findOne chesi true vasthe email exist rakapothe unique ani declare chesam 
      const vendorEmail=await Vendor.findOne({email});
      if(vendorEmail){
        return res.status(400).json("Email already taken");
      }
      // password ni encrypt chesam ee 10 anedhi oka algorithm ante 10 rounds ani 
      const hasedPassword = await bcrypt.hash(password,10);
      
      // ekda manam oka vendor object create chesthunam with the following details 
      const newVendor=new Vendor({
        username,
        email,
        password:hasedPassword
      });
      await newVendor.save();
      // ee save anedhi database ki save chesthundhi values ni input lo nunchi 

      res.status(201).json({message:"Vendor Registered successfully"});
      console.log("Regiesterd")
    }catch(error){
      res.status(500).json({error:"Internal server error"});
      console.log(error)
    }
    
}

const vendorLogin = async (req, res)=>{
    const {email, password}= req.body;
    try{
        const vendor = await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password, vendor.password))){
            return res.status(401).json({error:"Invalid username or password" })

        }
         const token = jwt.sign({vendorId: vendor._id},  secretKey, {expiresIn:'1h'})

        res.status(200).json({success: "Login successful",token})
        console.log(email, "this is token",token);


    }catch(error){
      res.status(500).json({error:"Internal server error"})
      console.log(error)
    }
}

//database lo vendors lo firms lo only id ae vasthundhi so motham chupiyali ante populate('firm') ani petali apdu firm lo vunna details anni vendor lo chudochu 

const getAllVendors=async(req,res)=>{
  try{
    const vendors = await Vendor.find().populate('firm')
    res.json({vendors})
  }catch(error){
    console.log(error)
   res.status(500).json({error:"Internal server error"})
  }
}


const getVendorById= async(req, res)=>{
  const vendorId= req.params.id 

  try{
    const vendor= await Vendor.findById(vendorId).populate('firm');
    if(!vendor){
      return res.status(404).json({error:"Vendor not found"});
    }
    res.status(200).json({vendor})
  }catch(error){
    console.log(error)
    res.status(500).json({error:"Internal server error"})
  }
}

module.exports = {vendorRegister, vendorLogin,getAllVendors, getVendorById}