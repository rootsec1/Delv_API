const Customer = require('../../models/Customer');

exports.create = (req,res)=>{
    if(req.body.id && req.body.name && req.body.phone) {        
            const customer = new Customer({
                _id: req.body.id,
                name: req.body.name,
                phone: req.body.phone,
                account_number: req.body.account_number?req.body.account_number:null,
                account_holder_name: req.body.account_holder_name?req.body.account_holder_name:null,
                ifsc: req.body.ifsc?req.body.ifsc:null
            });
            customer.save((error,data)=>sendResponse(error,data,req,res));
    } else sendResponse('Missing POST body params uid/name/phone',null,req,res);
};

exports.get = (req,res)=>{
    Customer.findById(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) Customer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error,data)=>sendResponse(error,data,req,res));
    else sendResponse('Missing PUT body params');
};

exports.delete = (req,res)=>{
    Customer.findByIdAndRemove(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

function sendResponse(error, data=null, request, response) {
    console.log('[CUSTOMER] '+request.method+' '+request.url);
    if(error) {
        console.log('[!SERVER-ERR] '+error);
        response.status(200).json({ error });
    } else if(data==null) response.status(200).json({ error: 'No entries found' });
    else response.status(200).json(data);
}