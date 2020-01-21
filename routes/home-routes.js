const router = require('express').Router();
const app = require('../app');
const userInfo = require('../model/user_info');

	var navs = "";
	
	router.get('/register', (req, res)=>{
		res.render('./component/register', {navs: 'register'});
	})

	router.get('/about', (req, res)=>{
		res.render('./component/about', {navs: 'about'});
	})


	



module.exports = router;