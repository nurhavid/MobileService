var express = require('express');
var router = express.Router();

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

module.exports = router;
