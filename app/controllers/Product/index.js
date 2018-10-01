const Product = require('../../models/Product');

exports.create = (req,res)=>{
    if(req.body.name && req.body.category && req.body.manufacturer && req.body.price && req.body.store_id) {
        const product = new Product({
            name: req.body.name,
            category: req.body.category,
            manufacturer: req.body.manufacturer,
            price: req.body.price,
            store_id: req.body.store_id,
            images: req.body.images?req.body.images:[],
            discount: req.body.discount?req.body.discount:0,
            colors: req.body.colors?req.body.colors:[]
        });
        product.save((error,data)=>sendResponse(error,data,req,res));
    } else sendResponse('Missing POST body params name/category/manufacturer/price/store_id',null,req,res);
};

exports.get = (req,res)=>{
    if(req.query.id) Product.findById(req.query.id, (error,data)=>sendResponse(error,data,req,res));
    else Product.find({ store_id: req.params.store_id }, (error,data)=>sendResponse(error,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error,data)=>sendResponse(error,data,req,res));
};

exports.delete = (req,res)=>{
    Product.findByIdAndRemove(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

function sendResponse(error, data, request, response) {
    console.log('[CUSTOMER] '+request.method+' '+request.url);
    if(error) {
        console.log('[!SERVER-ERR] '+error);
        response.status(200).json({ error });
    } else response.status(200).json(data);
}