module.exports = app => {
    const stores = require('../../controllers/Store');
    
    app.post('/stores', stores.create);
    app.get('/stores/:uid', stores.get);
    app.put('/stores/:id', stores.update);
    app.delete('/stores/:id', stores.delete);
};