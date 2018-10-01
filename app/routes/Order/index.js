module.exports = app => {
    const orders = require('../../controllers/Order');

    app.post('/orders', orders.create);
    app.get('/orders/:id', orders.get);
    app.put('/orders/:id', orders.update);
    app.delete('/orders/:id', orders.delete);
};