var productCtrl = require('../model/productCtrl.js');
var wishListCtrl = require('../model/wishListCtrl');



module.exports = function(app, express) {
//                    ///////General route///
                   //////products route///////
    //get all the products from the db 
    app.get('/product', productCtrl.getAllTheProduct);
    //add new product
    app.post('/product', productCtrl.createNewProduct);
    //remove prodct 
    app.delete('/product/delete/1/:id', productCtrl.deletItem)
                    //////wishList route///////
    app.get('/wishlist', wishListCtrl.getAllTheWishList);
    app.get('/wishlist/:id', wishListCtrl.getOneWishList);
    app.post('/wishlist', wishListCtrl.createNewWishList);
    app.put('/wishlist/product/add', wishListCtrl.updateWishList);
    app.delete('/wishlist/removewishlist', wishListCtrl.removeWishList);
    app.delete('/wishlist/removeitem', wishListCtrl.removeItemFromWishList);
};
