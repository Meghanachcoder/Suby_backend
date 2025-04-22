//for creating schema we want mongoose so 
const mongoose = require("mongoose")

//vendor ki schema create chesthunam kabbati 
const vendorSchema=new mongoose.Schema({
    //properties username, email(unique), password create cheyali vendor ki so 

    username:{
        type: String,
        required:true
    }, 
    email:{
        type: String, 
        required:true, 
        unique:true
    }, 
    password:{
        type: String, 
        required:false
    },
    firm:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Firm'
      }
    ]
});

// ee schema ni export chesthay ne veray files lo access chesukogalam so 

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports= Vendor;