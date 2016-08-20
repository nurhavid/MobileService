var express = require('express');
var router = express.Router();
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens


var secretKey = 'ilovescotchyscotch';
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }
});



UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

var User = mongoose.model('User', UserSchema);

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
    if(!username||!password){
        res.json({
            success: false,
            message: 'Enter a username and password',
        });
    }
    var user = new User({username:username,password:password});
    User.findOne({
        username: req.body.username
    }, function(err, tmp) {

        if (err) throw err;

        if (!tmp) {
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
                        message: 'Register Success',
                        token: token
                    });
                }
            });
        } else if (user) {
            res.json({ success: false, message: 'There is a username same with you' });

        }

    });


});


// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/login', function(req, res) {

    var username= req.body.username;
    var password = req.body.password;
    if(!username||!password){
        res.json({
            success: false,
            message: 'Enter a username and password',
        });
    }

    // find the user
    User.findOne({
        username: username
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            bcrypt.compare(password, user.password, function (err, isMatch) {
                if (err) throw err;
                console.log(isMatch);
                if(!isMatch){
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                }
                else{

                    // if user is found and password is right
                    // create a token
                    var token = jwt.sign(user, secretKey, {
                        expiresIn : 60*60*24
                    });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        message: 'Login Success!',
                        token: token
                    });
                }
            });
        }

    });
});

module.exports = router;
