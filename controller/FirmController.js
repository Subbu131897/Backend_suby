const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor')
const multer = require('multer')
const path = require('path');

  const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});
const upload = multer({storage:storage})


const addFirm= async(req,res)=>{
 try{
   const{firmName,area,category,region,offer}= req.body
  const image = req.file? req.file.filename:undefined;


  const vendor = await Vendor.findById(req.vendorId)
  if(!vendor){
    return res.status(404).json({message:"vendor not found"})
  }


  const firm = new Firm ({
    firmName,area,category,region,offer,image,vendor:vendor._id

  })
    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm);

    vendor.save();
  

  return res.status(200).json({message:"firm added successfully"})

 }catch(error){
  console.log(error)
  return res.status(500).json("internal server error")

 }
}

const deleteFirmById = async (req,res)=>{
 
  try {
     const firmId = req.params.firmId;

     const deletedFirm = await Firm.findByIdAndDelete(productId)
     if(!deletedFirm){
      res.status(404).json({error:"Firm not found"})

     }

    //  await Vendor.updateMany(
    //   { products: productId },
    //   { $pull: { products: productId } }
    // );

    // res.status(200).json({ message: "Product deleted successfully and removed from Vendor" });
  }  catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
    
  
  }
}
module.exports= {addFirm:[upload.single('image'),addFirm],deleteFirmById};