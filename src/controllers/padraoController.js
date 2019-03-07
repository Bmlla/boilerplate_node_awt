const User = require('../models/user')
const express = require(`express`);
const app = express();
var config = require('../config');
app.set('superSecret', config.secret);

const crypto = require("crypto");

const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    segredo : "usuarios",
    tipo : "hex"
};

const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);

exports.get = (req, res) => {
    cipher.update(req.query.password)
    var senhaCrypto = cipher.final(DADOS_CRIPTOGRAFAR.tipo)

    var nick = new User({ 
        name: req.query.name, 
        password: senhaCrypto,
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
