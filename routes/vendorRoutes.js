 const vendorController= require('../controllers/vendorController');
 const express=require("express");
//express lo vunna oka method ni tesukunam i.e. Router 
 const router=express.Router();
//manam database lo save aena details ni post chesthunam so post use chesi export cheyali 
router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);
router.get('/all-vendors',vendorController.getAllVendors);
router.get('/single-vendor/:id', vendorController.getVendorById );
module.exports= router;