var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MemberSchema = mongoose.Schema({item:String, qty:Number, price:Number});
var Member = mongoose.model('Store', MemberSchema);
mongoose.connect('mongodb://localhost/test',function(err){
  if(err){
    console.log('mongoose connection error:'+err);
    throw err;
  }
  console.log('mongoose connection success');
});

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//
// router.all('/insert', function (req, res, next) {
//   var username = req.param("username");
//   var nickname =req.param("nickname");
//   var member = new Member({username:username, nickname:nickname});
//   member.save(function (err,silence) {
//     if(err){
//       console.err(err);
//       throw err;
//     }
//     console.log('success');
//     res.send('success')
//   })
// })

router.all('/things', function(req, res, err){
  var member = new Member();
  Member.find(function (err, member) {
    if(err)
      return res.status(500).send({error:'database failure'});
    console.log(member);
    res.json(member);
  });
});

router.all('/things/:N_Item', function(req, res, err){
  var member = new Member();
  Member.findOne({item :req.params.N_Item}, function(err, member){
    if(err){
      console.err(err);
      throw err;
    }
    console.log(member);
    res.json(member);
  });
});

router.post('/insert', function (req, res, next) {
  var item = req.param("item");
  var qty =req.param("qty");
  var price =req.param("price");
  var member = new Member({item:item, qty:qty, price:price});
  member.save(function (err,silence) {
    if(err){
      console.err(err);
      throw err;
    }
    console.log('success');
    res.send('success')
  })
})

module.exports = router;
