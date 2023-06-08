const db = require('../connectbtl');
const sestion = require('node-sessionstorage');
module.exports = function(server){
    
    server.get('/users', function(req, res){
        res.render('use/user')
    });
    server.get('/home', function(req, res){
        res.render('home/home', {
        });
    });

   
    server.get('/logout', function (req, res) {
        sestion.removeItem('admin_login');
        res.redirect('/login');
    })

}