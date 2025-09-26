const Firm = require('../models/Firm');
const Product = require ('../models/Product');
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  }
});
const upload = multer({storage:storage});

const addProduct= async (req,res)=>{
  try {
    const {productName,price,category,bestSeller,description}=req.body
     const image = req.file? req.file.filename:undefined;

     const firmId = req.params.firmId;

     const firm = await Firm.findById(firmId);

     if(!firm){
      return res.status(404).json({error:"no firm found"})
     }

     const product= new Product({
      productName,price,category,bestSeller,description,firm:firm._id
     })

     const savedProduct = await product.save();
     firm.products.push(savedProduct);
     await firm.save();
     res.status(200).json({message:"product successfully added", savedProduct})

    
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal error while adding",error})
    
  }
}

const getProductByFirmId = async(req,res)=>{
  const firmId = req.params.firmId;
  const firm= await Firm.findById(firmId);
  try {
    if(!firm){
      res.status(404).json({error:"no firm found"})
    }

    const resturantName = firm.firmName;
    const product = await Product.find({firm:firmId})
    res.status(200).json({message:  "product fetched successfully",resturantName,product})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
    
  }
}

const deleteProductById = async (req,res)=>{
 
  try {
     const productId = req.params.productId;

     const deletedProduct = await Product.findByIdAndDelete(productId)
     if(!deletedProduct){
      res.status(404).json({error:"product not found"})

     }

     await Firm.updateMany(
      { products: productId },
      { $pull: { products: productId } }
    );

    res.status(200).json({ message: "Product deleted successfully and removed from firm" });
  }  catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"})
    
  
  }
}

module.exports={addProduct: [upload.single('image'),addProduct],getProductByFirmId,deleteProductById};