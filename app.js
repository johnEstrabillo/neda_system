const express = require('express');
const bodyParser = require('body-parser');
const homeRouter = require('./routes/home-routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.use('/libsys', homeRouter);

var port = process.env.PORT || 3000;

app.get('/', (req, res)=>{
	res.render('index', {navs: 'home'});
});

app.listen(port, (err)=>{
	if (err) throw err;
	console.log('Server is now listening to port 3000');
})