module.exports = app => {
    const customers = require('../../controllers/Customer');

    app.post('/customers', customers.create);
    app.get('/customers/:uid', customers.get);
    app.put('/customers/:id', customers.update);
    app.delete('/customers/:id', customers.delete);
};