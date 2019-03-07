const User = require('../models/user')
const express = require(`express`);
const app = express();

var config = require('../config');
app.set('superSecret', config.secret);

exports.get = (req, res) => {
    var nick = new User({ 
        name: req.query.name, 
        password: req.query.password,
        admin: true 
    });
    
    nick.save(function(err) {
        if (err) throw err;
    
        console.log('User saved successfully');
        res.json({ success: true });
    });

    //res.status(200).send(`API respondendo GET`)
}


exports.getUsers = (req, res) => {
    User.find({},function(err, req){
        res.json(req)
    })
}

exports.getStatus = (req, res) => {
    res.status(200).send('API funcionando 1000%')
}
