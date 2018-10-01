const Customer = require('../../models/Customer');

exports.create = (req,res)=>{
    if(req.body.uid && req.body.name && req.body.phone) {
        Customer.findOne({ uid: req.body.uid }, (errCustomer, dataCustomer)=>{
            if(errCustomer || dataCustomer) sendResponse(errCustomer||'Customer with UID '+req.body.uid+' already exists.',req,res);
            else {
                const customer = new Customer({
                    uid: req.body.uid,
                    name: req.body.name,
                    phone: req.body.phone,
                    account_number: req.body.account_number?req.body.account_number:null,
                    account_holder_name: req.body.account_holder_name?req.body.account_holder_name:null,
                    ifsc: req.body.ifsc?req.body.ifsc:null
                });
                customer.save((error,data)=>sendResponse(error,data,req,res));
            }
        });
    } else sendResponse('Missing POST body params uid/name/phone',null,req,res);
};

exports.get = (req,res)=>{
    Customer.findOne({ uid: req.params.uid }, (error,data)=>sendResponse(error,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) Customer.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error,data)=>sendResponse(error,data,req,res));
    else sendResponse('Missing PUT body params');
};

exports.delete = (req,res)=>{
    Customer.findByIdAndRemove(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

function sendResponse(error, data, request, response) {
    console.log('[CUSTOMER] '+request.method+' '+request.url);
    if(error) {
        console.log('[!SERVER-ERR] '+error);
        response.status(200).json({ error });
    } else response.status(200).json(data);
}