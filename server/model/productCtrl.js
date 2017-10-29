let Product = require('./product.js');

module.exports = {

    createNewProduct: function (req, res) {
        var product = new Product({
            title: req.body.title,
            price: req.body.price
        }).save(function (err, newProduct) {
            if (err) {
                res.status(500).send("there is an error");
            } else {
                res.send(newProduct);
            }
        })
    },

    getAllTheProduct: function (req, res) {
        Product.find({}, function (err, products) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(products);
            }
        });
    },

    deletItem: function (req, res) {
        Product.remove({
            _id: req.params.id
        }, function (err, state) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(state);
            }

        });
    }

}
