const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');
const Auth = require('../auth');

productRouter.post('/createitem', Auth.isAuth,Auth.isAdmin, productController.createProduct);
productRouter.get('/getitems', productController.getProducts);
productRouter.get('/getitem/:productId',Auth.isAuth, productController.getProduct);
productRouter.put('/update/:productId',Auth.isAuth,Auth.isAdmin, productController.updateProduct);
productRouter.delete('/delete/:productId',Auth.isAuth,Auth.isAdmin, productController.deleteProduct);
productRouter.post('/addtocart/:productId',Auth.isAuth, productController.addToCart);
productRouter.post('/removefromcart/:productId',Auth.isAuth, productController.removeFromCart); 
productRouter.get('/getcart',Auth.isAuth, productController.getCart);

module.exports = productRouter;