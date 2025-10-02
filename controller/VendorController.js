const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnv = require('dotenv');


dotEnv.config();
const secretkey = process.env.JWTKEY;

const VendorRegister = async(req,res)=>{
  const{username, email,password}= req.body
  const vendorEmail = await Vendor.findOne({email});
  
  try{
    if(vendorEmail){
      return res.status(400).json("Email already taken");
    }
    const hashPassword = await bcrypt.hash(password,10);  
    const newVendor = Vendor({
      username,
      email,
      password:hashPassword
    })
    await newVendor.save();
    res.status(201).json({message:"NewVendor Created Successfully"});
  }

  catch(error){
    res.status(500).json(message,`Internal server error,${error}`)
  }
}
const vendorLogin = async(req,res)=>{
  const{email,password} = req.body;
  try{
    const vendor = await Vendor.findOne({email});
    if(!vendor || !(await bcrypt.compare(password, vendor.password))){
       res.status(400).json({message:"Invalid username or Password"})
    }
    const token = jwt.sign({vendorId : vendor._id}, secretkey,{expiresIn:"1h"})
    res.status(200).json({message: "Login Successful",token});
    // console.log(email,"this is token",token);

  }catch(error){
    res.status(500).json({message: error})

  }
}

const getAllVendors = async(req,res)=>{
  try {
    const vendors = await Vendor.find().populate('firm');
    // res.status(200)
    res.json({vendors})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"there is server error"});
  }
}
const getVendorById =async(req,res)=>{
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      res.status(404).json({error:"vendor not found"});
    } else {
      res.status(200).json({vendor})
    }
    
  } catch (error) {
    console.log(error);
    res.status(error);
  }
}

module.exports = {VendorRegister,vendorLogin,getAllVendors,getVendorById};