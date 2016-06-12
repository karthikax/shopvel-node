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
    var p = product.find(req.id);
    res.json(p);
};

exports.create = function (req, res) {
    // Create a product
    product.create({ slug: req.body.slug, name: req.body.name }, function(err, p) {
        if (err) {
            res.send({ message: err });
        }else{
            res.json({ message: 'Product Created Successfully', product: p });
        }
    });
};

exports.edit = function (req, res, next) {
    res.json({ message: 'Test' });
};

exports.delete = function (req, res, next) {
    res.json({ message: 'Test' });
};