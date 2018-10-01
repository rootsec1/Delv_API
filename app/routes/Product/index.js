module.exports = app => {
    const products = require('../../controllers/Product');

    app.post('/products', products.create);
    app.get('/products/:store_id', products.get);
    app.put('/products/:id', products.update);
    app.delete('/products/:id', products.delete);
};