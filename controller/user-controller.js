const session = require('express-session')
const keys = require('../config/keys')
const passport = require('passport')
const mongoose = require('mongoose')
const userInfo = require('../model/user_info');

mongoose.Promise = global.Promise;
mongoose.set('debug', true);
mongoose.connect(process.env.MONGO_URI || keys.mongodb.url,{useNewUrlParser:true},(err)=>{
  if(err) throw err;
  console.log('administrator-controller is now connected to database');
});

module.exports = function(app){
	app.use(session({
    	secret: keys.sessionKey.secretKey,
		resave: true,
    	saveUninitialized: true
	}));
  const bodyParser = require('body-parser');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));

  	
	  
	  app.post('/auth_login', (req, res, next)=>{
	  	console.log('okdkadfj')

	  	userInfo.findOne({username: req.body.email , password: req.body.password}, (err, user)=>{


	  		if(user){

	  			req.session.user = user.email;
	  			return res.redirect('landing');
	  			res.end('done');
	  		}
	  	});


	})


}