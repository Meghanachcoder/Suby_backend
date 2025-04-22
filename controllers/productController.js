const Firm = require('../models/Firm');
const Product = require('../models/Product');
const multer= require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + Path.extname( file.originalname)); // Unique filename
    }
  });
  
  const upload = multer({ storage });

const addProduct= async(req,res)=>{
    try{
        const {productName, price, category, bestSeller, description}=req.body;
        const image= req.file? req.file.filename:undefined;

        const firmId= req.params.firmId;
        const firm = await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"Firm not Found"});
        }
        const product = new Product({
            productName, price, category, bestSeller, description,image, firm:firm._id
        })

        const savedProduct= await product.save()

        firm.product.push(savedProduct)

        await firm.save() 

        res.status(200).json({savedProduct})

    }catch(error){
      console.log(error)
      res.status(500).json({error:"Internal server error"});
    }
}

const getProductByFirm = async(req,res)=>{
  try {
    const firmId= req.params.firmId;
    const firm = await Firm.findById(firmId)
    if(!firm){
      return res.status(404).json({error:"No Firm Found"});
    }
    const restaurantName= firm.firmName;
    const products= await Product.find({firm:firmId})

    res.status(200).json({restaurantName,products })

    
  } catch (error) {
    console.log(error)
      res.status(500).json({error:"Internal server error"});
  }
}

const deleteProductById= async(req,res)=>{
  try {
    const productId= req.params.productId;
    const deletedProduct= await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
      return res.status(404).json({error:"No product Found"});
    }
    

  } catch (error) {
    console.log(error)
    res.status(500).json({error:"Internal server error"});
  }
}

module.exports= {addProduct:[upload.single('image'),addProduct], getProductByFirm, deleteProductById};