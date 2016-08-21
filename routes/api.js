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
var ProcurementSchema = new Schema({
    username : { type: String, required: true  },
    itemname:{ type: String, required: true  },
    qty:{ type: Number, required: true  },
    buyprice:{ type: Number, required: true  },
    sellprice:{ type: Number, required: true  },
    date : {type: Date, required:true}
});

var ItemSchema = new Schema({
    username: {type: String, require: true},
    itemname:{ type: String, required: true  },
    qty:{ type: Number, required: true  },
    sellprice:{ type: Number, required: true  }

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
var Procurement = mongoose.model('Procurement', ProcurementSchema);
var Item = mongoose.model('Item', ItemSchema);

mongoose.connect('mongodb://localhost/ajouma',function(err) {
    if(err) {
        console.log('mongoose connection error :'+err);
        throw err;
    }
    console.log('mongoose connection success');
});



router.post('/register',function (req,res,next) {
    var username= req.body.username;
    var password = req.body.password;
    if(!username||!password){
        return res.json({
            success: false,
            message: 'Enter a username and password',
        });

    }else {
        var user = new User({username: username, password: password});
        User.findOne({
            username: req.body.username
        }, function (err, tmp) {

            if (err)    return res.status(500).send({error: 'database failure'});

            if (!tmp) {
                user.save(function (err, silence) {
                    if (err) {
                        console.log(err);
                        return res.status(500).send({error: 'database failure'});
                    } else {
                        var token = jwt.sign(user, secretKey, {
                            expiresIn: 60 * 60 * 24
                        });

                        // return the information including token as JSON
                        return res.json({
                            success: true,
                            message: 'Register Success',
                            token: token
                        });
                    }
                });
            } else  {
                return res.json({success: false, message: 'That Username is already used'});
            }
        });
    }
});

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/login', function(req, res) {

    var username= req.body.username;
    var password = req.body.password;
    if(!username||!password){
        return es.json({
            success: false,
            message: 'Enter a username and password',
        });
    }else {
        // find the user
        User.findOne({
            username: username
        }, function (err, user) {
            if (err)    return res.status(500).send({error: 'database failure'});
            if (!user) {
                return res.json({success: false, message: 'Authentication failed. User not found.'});
            } else if (user) {
                bcrypt.compare(password, user.password, function (err, isMatch) {
                    if (err)  return res.status(500).send({error: 'database failure'});
                    if (!isMatch) {
                        return res.json({success: false, message: 'Authentication failed. Wrong password.'});
                    }
                    else {

                        // if user is found and password is right
                        // create a token
                        var token = jwt.sign(user, secretKey, {
                            expiresIn: 60 * 60 * 24
                        });
                        // return the information including token as JSON
                        return res.json({
                            success: true,
                            message: 'Login Success!',
                            token: token
                        });
                    }
                });
            }
        });
    }
});

router.use(function(req, res, next) {
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
});


router.get('/getProcurement/:username', function(req, res, err){
    console.log(req.params.username);
    Procurement.find({username: req.params.username},function (err, procurement) {
        if(err)
            return res.status(500).send({success:false, error:'database failure'});
        console.log(procurement);
        return res.json(procurement);
    });
});

router.post('/addProcurement', function (req, res, next) {
    var username = req.body.username;
    var itemname = req.body.itemname;
    var qty =req.body.qty;
    var buyprice =req.body.buyprice;
    var sellprice = req.body.sellprice;
    var date = req.body.date;
    if(!username||!itemname||!qty||!buyprice||!sellprice||!date){
        return res.json({
            success: false,
            message: 'Please complete all the fields',
        });
    }
    var procurement = new Procurement({username:username,itemname:itemname, qty:qty, buyprice:buyprice, sellprice:sellprice, date:date});
    procurement.save(function (err,silence) {
        if(err){
            console.log(err);
            return res.status(500).send({error:'database failure'});
        }

        updateItem(username,itemname,qty,sellprice);

        console.log('success');
        return res.json({
            success: true,
            message: 'Added Successfully'
        });
    });
});

function updateItem(username,itemname, qty,sellprice){
    Item.findOne({username:username,itemname : itemname}, function(err, item){
        if(err){
            console.log(err);
        }
        if(item){
            console.log(item.qty);

            Item.update(
                { username:username,itemname : itemname },
                {
                    $set: { qty :  parseInt(qty) + parseInt(item.qty), sellprice:sellprice}
                },function (err,result) {

                });
        }else{
            var newItem = new Item({username:username,itemname:itemname, qty:qty, sellprice:sellprice });
            newItem.save((function (err,silence) {
                if(err){
                    console.log(err);
                }

            }));
        }
    });
}
router.get('/getInventory/:username', function(req, res, err){
    console.log(req.params.username);
    Item.find({username: req.params.username},function (err, procurement) {
        if(err)
            return res.status(500).send({success:false, error:'database failure'});
        console.log(procurement);
        return res.json(procurement);
    });
});




module.exports = router;
