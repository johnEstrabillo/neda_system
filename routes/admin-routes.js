const router = require('express').Router();
const app = require('../app');
const userInfo = require('../model/user_info');

router.get('/login', (req, res)=>{
		console.log(req.session.user)

		if(req.session.user){
			res.redirect('landing');
			return res.end('done');
		}else{
			res.render('./component/login', {navs: 'login'});
		}
});




router.get('/landing', (req, res)=>{
	if(req.session.user){
		res.send('okidokie')
	}else{
		
		res.redirect('login')
	}
})


module.exports = router;