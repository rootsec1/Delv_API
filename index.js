const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
//LOCAL
const config = require('./config');
const PORT = process.argv[2] || process.env.PORT || config.PORT;
mongoose.Promise = global.Promise;

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req,res)=>res.status(200).json({ message: 'Available Endpoints: /customers /stores /products /orders' }));

require('./app/routes/Customer')(app);
require('./app/routes/Store')(app);
require('./app/routes/Product')(app);
require('./app/routes/Order')(app);
mongoose.connect(config.DB_URI, { useNewUrlParser: true, useCreateIndex: true, }, err=>{
    if(err) {
        console.log('[!DB] '+err);
        process.exit();
    } else app.listen(PORT, '0.0.0.0', ()=>console.log('[SERVER] Listening on port '+PORT));
});