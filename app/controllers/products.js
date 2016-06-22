/**
 *  Get products
 */

var product	= require('../models/product');

exports.get = function (req, res, next) {
    // Find all products
    product.find({}, function(err, p){
        res.json({ products: p });
    });
};

exports.view = function (req, res, next) {
    // Find one product
    product.findById(req.params.pid, function(err, p){
        res.json({ products: p });
    });
};

exports.create = function (req, res) {
    // Create a product
    product.create({ slug: req.body.slug, name: req.body.name }, function(err, p) {
        if (err) {
            res.send({ message: err });
        }
        res.json({ message: 'Product Created Successfully', product: p });
    });
};

exports.edit = function (req, res, next) {
    // Edit a product
    product.findById(req.params.pid, function(err, p){
        if (err) {
            res.send({ message: err });
        }
        p.slug = req.body.slug;
        p.name = req.body.name;
        p.price = req.body.price;
        p.save();
        res.json({ message: 'Product Edited Successfully', product: p });
    });
};

exports.delete = function (req, res, next) {
    // Delete a product
    product.findById(req.params.pid).remove(function(err, op){
        if (err) {
            res.send({ message: err });
        }
        res.json({ result: op.result });
    });
};