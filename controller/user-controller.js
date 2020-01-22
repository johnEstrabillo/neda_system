const session = require('express-session')
const keys = require('../config/keys')
const passport = require('passport')
const mongoose = require('mongoose')
const userInfo = require('../model/user_info');
const vehicleInfo = require('../model/vehicle');

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

	  			req.session.user = user.fullname;
	  			req.session.userId = user._id;
	  			return res.redirect('landing');
	  			res.end('done');
	  		}
	  	});
	})

	  
	  app.post('/add_vehicle', (req, res, next)=>{

	  	vehicleInfo.findOne({
	  		brand: req.body.brand,
  			model: req.body.model,
  			year: req.body.year
	  	}, (err, user)=>{

	  		if(user){
	  			console.log('Vehicle Already Exist')
	  			return false;
	  		}else{
	  			new vehicleInfo({
	  				brand: req.body.brand,
		  			model: req.body.model,
		  			year: req.body.year
	  			}).save(()=>{
	  				console.log('Data Saved Successfully')
	  			});
	  		}

		

	  	});
	})


}