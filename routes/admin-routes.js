const router = require('express').Router();
const app = require('../app');
const userInfo = require('../model/user_info');
const vehicleInfo = require('../model/vehicle');

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
		res.render('admin/manage-owner', {fullname: req.session.user})
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





module.exports = router;