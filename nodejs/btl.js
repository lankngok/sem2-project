const express = require('express');
const ejs = require('ejs');
const server = express();
const bodyParser = require('body-parser');
const sestion = require('node-sessionstorage');

server.set('view engine', 'ejs');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static('public'));

require('./routes/login.router')(server);
const cors = require('cors');
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
}


server.use(cors(corsOptions));
require('./routes/api.category')(server);
require('./routes/api.tours')(server);
require('./routes/api.account')(server);
require('./routes/api.favourite')(server);
const auth = require('./routes/moddleware/auth');
server.use(auth);
server.locals.nameuser = sestion.getItem('admin_login');
require('./routes/home.routes')(server);

require('./routes/category.routes')(server);
require('./routes/tours.routes')(server);
require('./routes/account.routes')(server);


server.listen(3000, function(){
    console.log('Mở cổng http://localhost:3000')
});