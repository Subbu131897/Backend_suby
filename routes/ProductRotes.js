const express = require ('express');
const mongoosee = require('mongoose');
const productController = require ('../controller/ProductController');
const router = express.Router();

router.post('/add-product/:firmId',productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirmId)
router.delete('/:productId',productController.deleteProductById)

router.get('/uploads/:imageName',(req,res)=>{
  const imageName = req.params.imageName;
  res.headersSent('Content-Type','image/jpeg');
  res.sendFile(path.join(__dirname,'..','uploads',imageName))
})
module.exports = router
