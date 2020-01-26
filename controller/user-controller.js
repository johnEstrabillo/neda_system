const session = require('express-session')
const keys = require('../config/keys')
const passport = require('passport')
const mongoose = require('mongoose')
const userInfo = require('../model/user_info');
const vehicleInfo = require('../model/vehicle');
const ownerInfo = require('../model/vehicle-owner');


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



	app.post('/save_owner_vehicle', (req, res, next)=>{
	  	ownerInfo.find({plate_no: req.body.plateNumber}, (err, user)=>{
	  		if (user.length >= 1){
	  			

	  			if(user[0].plate_no === 'for registration'){
		  			new ownerInfo({
						plate_no: req.body.plateNumber,
						fullname: req.body.fullname,
						brand: req.body.brandName,
						color: req.body.color,
						driver: req.body.driver,
						remarks: req.body.remarks

		  			}).save((err)=>{
		  				console.log('Data Successfully Saved')
		  			})
		  		}else{
		  			console.log('Plate Number Already Registered.')
		  		}
	  		}else{
	  			new ownerInfo({
					plate_no: req.body.plateNumber,
					fullname: req.body.fullname,
					brand: req.body.brandName,
					color: req.body.color,
					driver: req.body.driver,
					remarks: req.body.remarks

	  			}).save((err)=>{
	  				console.log('Data Successfully Saved')
	  			})
	  		}
	  	})
	})




	app.post('/edit_owner_vehicle', (req, res, next)=>{
	  	ownerInfo.updateOne({_id: req.body.id}, {$set:{
	  		plate_no: req.body.plateNumber,
			fullname: req.body.fullname,
			brand: req.body.brandName,
			color: req.body.color,
			driver: req.body.driver,
			remarks: req.body.remarks
	  	}}, (err)=>{
	  		if (err) throw err;
	  		console.log('Data Updated Successfully')
	  	})
	})


	app.post('/delete-owner-info', (req, res)=>{
		ownerInfo.deleteOne({_id: req.body.id}, (err)=>{
			console.log('data deleted');
		})
	})


	app.post('/delete-vehicle', (req, res)=>{
		vehicleInfo.deleteOne({_id: req.body.id}, (err)=>{
			console.log('data deleted');
		})
	})



	app.post('/edit_vehicle', (req, res, next)=>{

		console.log('pasok')

		vehicleInfo.updateOne({_id: req.body.id}, {$set:{
	  		brand: req.body.brand,
	  		model: req.body.model,
	  		year: req.body.year
	  	}}, (err)=>{
	  		console.log('Data Updated Successfully')
	  	})
	})






}