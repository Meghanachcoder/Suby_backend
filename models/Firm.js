 const mongoose =require("mongoose")

 const firmSchema= new mongoose.Schema ({
    firmName:{
        type: String,
        required:true,
        unique:true
    },
    area:{
        type:String, 
        required:true,
    }, 
    category:{
        type:[
            {
                type: String, 
                enum:['veg','non-veg']
            }
        ]
    },
    region:{
        type:[
            {
                type:String, 
                enum:['south-indian','north-indian','chinese','bakery']
            }
        ]
    },
    offer:{
        type:String, 
    },
    image:{
        type:String
    },
    //epdu aethay type ki mongoose dhi add chesamo apdu manam e model ki veray model tho link chesthunattu ante epdu firm ki vendor ki link chesam ref ki ae table tho relation oh adhi petali 
    vendor:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'
        }
    ],
    product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ]
 })

 const Firm = mongoose.model("Firm", firmSchema);
 module.exports = Firm

