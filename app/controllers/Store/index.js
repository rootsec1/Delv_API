const Store = require('../../models/Store');

exports.create = (req,res)=>{
    if(req.body.uid && req.body.name && req.body.department && req.body.phone && req.body.latitude && req.body.longitude) {
        const store = new Store({
            uid: req.body.uid,
            name: req.body.name,
            department: req.body.department,
            phone: req.body.phone,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            delivery_service: req.body.delivery_service?req.body.delivery_service:false
        });
        store.save((error,data)=>sendResponse(error,data,req,res));
    } else sendResponse('Missing POST body params uid/name/department/phone/latitude/longitude',null,req,res);
};

exports.get = (req,res)=>{
    Store.findOne({ uid: req.params.uid }, (error,data)=>sendResponse(error,data,req,res));
};

exports.update = (req,res)=>{
    if(req.body) Store.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (error,data)=>sendResponse(error,data,req,res));
    else sendResponse('Missing PUT body params');
};

exports.delete = (req,res)=>{
    Store.findByIdAndRemove(req.params.id, (error,data)=>sendResponse(error,data,req,res));
};

function sendResponse(error, data, request, response) {
    console.log('[CUSTOMER] '+request.method+' '+request.url);
    if(error) {
        console.log('[!SERVER-ERR] '+error);
        response.status(200).json({ error });
    } else response.status(200).json(data);
}