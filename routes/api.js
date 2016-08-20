var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens


var secretKey = 'ilovescotchyscotch';
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');

var UserSchema= mongoose.Schema({username:String, password:String});
var User = mongoose.model('user',UserSchema);

mongoose.connect('mongodb://localhost/ajouma',function(err) {
    if(err) {
        console.log('mongoose connection error :'+err);
        throw err;
    }
    console.log('mongoose connection success');
});

router.use(function(req, res, next) {

    console.log(req.url);

    if(req.url=='/register'||req.url=='/authenticate'){
        next() ;
    }else{

        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // decode token
        if (token) {

            // verifies secret and checks exp
            jwt.verify(token, secretKey, function(err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    }
});

router.get('/users', function(req, res) {
    User.find( function(err, users) {
        res.json(users);
    });
});

router.post('/register',function (req,res,next) {
    var username= req.body.username;
    var password = req.body.password;
    var user = new User({username:username,password:password});
    user.save(function (err,silence) {
        if(err){
            console.err(err);
            throw err;
        }else{
            var token = jwt.sign(user, secretKey, {
                expiresIn : 60*60*24
            });

            // return the information including token as JSON
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        }
    });
});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
        username: req.body.username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            // check if password matches
            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, secretKey, {
                    expiresIn : 60*60*24
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });
});

module.exports = router;
