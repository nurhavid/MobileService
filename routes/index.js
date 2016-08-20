var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UserSchema= mongoose.Schema({username:String, password:String});
var User = mongoose.model('UserModel',UserSchema);
mongoose.connect('mongodb://localhost/mongotest',function(err) {
  if(err) {
    console.log('mongoose connection error :'+err);
    throw err;
  }
  console.log('mongoose connection success');
});

router.all('/insert',function (req,res,next) {
  var username= req.param("username");
  var nickname = req.param("nickname");
  var member = new Member({username:username,nickname:nickname});
  member.save(function (err,silence) {
    if(err){
      console.err(err);
      throw err;
    }
    console.log('success');
    res.send('success');
  });
});

router.all('/users',function (req,res,err) {
  var member = new Member();
  Member.find(function (err,member) {
    if(err){
      return res.status(500).send({error:'database failure'});
    }
    console.log(member);
    res.json(member);
  });

});

router.all('/users/:userName',function (req,res,err) {
  var member = new Member();
  Member.findOne({username:req.params.userName},function (err,member) {
    if(err){
      console.err(err);
      throw err;
    }
    console.log(member);
    res.json(member);
  });

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
