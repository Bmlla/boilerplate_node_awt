const express = require(`express`);
const router = express.Router();
const controller = require('../controllers/padraoController')
const controllerJWT = require('../controllers/JwtController')
const jwt = require('jsonwebtoken');

const app = express();

var config = require('../config');
app.set('superSecret', config.secret);

router.get('/setup', controller.get);

//Auth com JWT
router.post('/authenticate', controllerJWT.post)

router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, app.get('superSecret'), function (err, decoded) {
            if (err) {
                return res.json({ sucess: false, message: 'Falha na autenticacao do token' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        return res.status(403).send({
            success: false,
            message: 'Sem token informado'
        });
    }
})

router.get('/', controller.getStatus)
router.get('/users', controller.getUsers)

module.exports = router;


