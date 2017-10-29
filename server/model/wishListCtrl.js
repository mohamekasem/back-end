var WishList = require('./wishlist');
var Product = require('./product');

module.exports = {
      
    getAllTheWishList: function(req, res) {
        WishList.find({}).populate({path: 'products', model: 'Product'}).exec(function(err,wishLists){
              if(err){
                res.status(500).send(err);
            }else {
                 res.send(wishLists);  
            }
        })    
    },
    
    getOneWishList : function (req, res){
        WishList.findOne({_id:req.params.id}, function(err,wishlist){
            if(err){
                res.status(500).send(err);
            }else {
                res.send(wishlist)
            }
        })
    },
    
    createNewWishList: function (req, res) {
        var wishlist = new WishList({
            title: req.body.title
        });
        wishlist.save(function (err, newWishList) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(newWishList);
            }
        })
    },
    
    updateWishList : function(req, res){
        Product.findOne({_id: req.body.productId}, function(err, product){
            if(err){
                res.status(500).send(err);
            }else {
           WishList.update({_id: req.body.wishListId}, {$addToSet:{products: product._id}}, function(err, wishList) {
                    if(err){
                        res.status(500).send(err);
                    }else {
                        res.send(wishList);
                    }
                })
            }
        })
    },
    
    removeItemFromWishList : function (req, res){
        var idsArray;
        var productId = req.body.productId;
        WishList.findOne({_id:req.body.wishlistId}, function(err,arrOfObj){
             if(err){
                 res.status(500).send(err); 
            }else {
                console.log(arrOfObj.products);
//               for(var x =0; x < arrOfObj.products.length; x++){
//                   if(arrOfObj.products[x] == productId){
//                       arrOfObj.products.splice(x, 1)
////                       arrOfObj.products = idsArray;$unset
//                       break
//                   }
//               }
         WishList.update({_id: req.body.wishListId}, {$unset:{products: productId}}, function(err, wishList) {
                if(err){
                     res.status(500).send(err);
                 }else {
                        res.send(wishList);
                    }
                })
            }   
        })
     },
    
    removeWishList : function (req, res){
        WishList.findOne({_id: req.body.id}, function(err, ok){
            if(err){
               res.send(err);
            }else{
                WishList.remove(ok,function(err, state){
                    if(err){
                        res.status(500).send(err);
                    }else{
                        res.send(state);
                    }
                })    
            }
        })
    }
    
}
