const express= require("express");

const dotEnv= require("dotenv");

const mongoose=require("mongoose");
const vendorRoutes=require("./routes/vendorRoutes")
const bodyParser=require("body-parser");
const firmRoutes=require("./routes/firmRoutes")
const productRoutes=require("./routes/productRoutes");
const path=require("path");



const app=express()

const PORT=4000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected successfully"))
.catch((error)=> console.log(error))

//manaki input numchi vachey vatiki json loki convert cheyali 
app.use(bodyParser.json());
//vendorRouter ki http req create chesam 
app.use('/vendor', vendorRoutes);
app.use("/firm",firmRoutes)
app.use("/product", productRoutes)
app.use("/uploads", express.static('uploads'));

app.listen(PORT, ()=>{
    console.log(`server started and running at ${PORT}`)
})

app.use('/home', (req, res)=>{
    res.send("<h1> Welcome to suby app </h1>")
})