const router = require('express').Router();
const app = require('../app');
const userInfo = require('../model/user_info');
const vehicleInfo = require('../model/vehicle');
const ownerInfo = require('../model/vehicle-owner');

router.get('/login', (req, res)=>{
		console.log(req.session.user)
		console.log(req.session.userId)

		if(req.session.userId){
			res.redirect('landing');
			return res.end('done');
		}else{
			res.render('./component/login', {navs: 'login'});
		}
});




router.get('/landing', (req, res)=>{
	if(req.session.userId){
		vehicleInfo.find({}, (err, user)=>{
			res.render('dashboard', {fullname: req.session.user, vehicle: user})
		}).sort({brand:1})
		
	}else{
		
		res.redirect('login')
	}
})


router.get('/add-new-vehicle', (req, res)=>{
	if(req.session.userId){
		res.render('admin/add-brand', {fullname: req.session.user})
	}else{
		
		res.redirect('login')
	}
})


router.get('/view-owner', (req, res)=>{
	if(req.session.userId){
		ownerInfo.find({}, (err, owner)=>{
			res.render('admin/manage-owner', {fullname: req.session.user, owners:owner})
		}).sort({plate_no:1})		
	}else{
		
		res.redirect('login')
	}
})


router.get('/add-owner-vehicle-info', (req, res)=>{
	if(req.session.userId){
		vehicleInfo.find({}, (err, user)=>{
			res.render('admin/add-owner-vehicle', {fullname: req.session.user, vehicle: user})
		}).sort({brand:1})
	}else{
		res.redirect('login')
	}
})

router.get('/view-full-owner/:ownId', (req, res)=>{

	if(req.session.userId){
		ownerInfo.findOne({_id: req.params.ownId}, (err, data)=>{
			if(data){
				res.render('admin/view-full-owner', ({ fullname: req.session.user, owner: data }))
			}
		})
	}else{
		res.redirect('../login')
	}	
})


router.get('/edit-vehicle-and-owner-info/:ownId', (req, res)=>{
	if(req.session.userId){
		ownerInfo.findOne({_id: req.params.ownId}, (err, data)=>{
			vehicleInfo.find({}, (err, user)=>{
				res.render('admin/edit-vehicle-owner', ({ fullname: req.session.user, owner: data, vehicle: user}))
			}).sort({brand:1})
		})
	}else{
		res.redirect('../login')
	}	
})



router.get('/edit-vehicle/:id', (req, res)=>{
	if(req.session.userId){
		console.log(req.params.id)
			vehicleInfo.findOne({_id: req.params.id}, (err, user)=>{
				if(user){
					console.log(user._id);
				}
				res.render('admin/edit-brand', ({ fullname: req.session.user, vehicle: user}))
			}).sort({brand:1})	
	}else{
		res.redirect('../login')
	}	
})








module.exports = router;