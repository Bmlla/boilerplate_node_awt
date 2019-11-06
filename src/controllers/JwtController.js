const User = require("../models/user");
const jwt = require("jsonwebtoken");
const express = require(`express`);
const app = express();
const crypto = require("crypto");
var config = require("../config");
app.set("superSecret", config.secret);

exports.post = (req, res) => {

  const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    codificacao: "utf8",
    segredo: "usuarios",
    tipo: "hex"
  };

  const decipher = crypto.createDecipher(
    DADOS_CRIPTOGRAFAR.algoritmo,
    DADOS_CRIPTOGRAFAR.segredo
  );

  User.findOne(
    {
      name: req.body.name
    },
    function (err, user) {
      if (err) throw err;

      //Usuario invalido (null, blank, undefined, false...)
      if (!user) {
        res.json({
          success: false,
          message: "Falha na autenticacao. Usuario nao encontrado"
        });
      } else if (user) {
        //Verifica se a senha bate
        decipher.update(user.password, DADOS_CRIPTOGRAFAR.tipo);
        console.log(user.password);
        var senhaUncrypto = decipher.final();

        if (senhaUncrypto != req.body.password) {
          res.json({
            success: false,
            message: "Falha na autenticacao. Senha invalida."
          });
        } else {
          //Se tudo deu certo ate agora
          const payload = {
            admin: user.admin
          };

          var token = jwt.sign(payload, app.get("superSecret"), {
            expiresIn: 1440
          });

          res.json({
            sucess: true,
            message: "Token Gerado com Sucesso",
            token: token
          });
        }
      }
    }
  );
};
