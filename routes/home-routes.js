const router = require('express').Router();

	var navs = "";
	
	router.get('/login', (req, res)=>{

		res.render('./component/login', {navs: 'login'});
	})

	router.get('/register', (req, res)=>{
		res.render('./component/register', {navs: 'register'});
	})

	router.get('/about', (req, res)=>{
		res.render('./component/about', {navs: 'about'});
	})

module.exports = router;