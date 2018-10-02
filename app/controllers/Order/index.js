const Order = require('../../models/Order');

exports.create = (req,res)=>{
    if(req.body.latitude && req.body.longitude && req.body.customer_id && req.body.product_ids) {
        const order = new Order({
            customer_id: req.body.customer_id,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            product_ids: req.body.product_ids
        });
        order.save((error,data)=>sendResponse(error,data,req,res));
    } else sendResponse('Missing POST body params latitude/longitude/customer_id/product_ids',null,req,res);
};

exports.get = (req,res)=>{
    Order.findById(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error,data)=>sendResponse(error,data,req,res));
    else sendResponse('Missing PUT body params',null,req,res);
};

exports.delete = (req,res)=>{
    Order.findByIdAndRemove(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

function sendResponse(error, data=null, request, response) {
    console.log('[CUSTOMER] '+request.method+' '+request.url);
    if(error) {
        console.log('[!SERVER-ERR] '+error);
        response.status(200).json({ error });
    } else if(data==null) response.status(200).json({ error: 'No entries found' });
    else response.status(200).json(data);
}