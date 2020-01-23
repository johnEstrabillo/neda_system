const express = require('express');
const userControl = require('./controller/user-controller.js');
const adminRouter = require('./routes/admin-routes.js');
const router = require('./routes/home-routes.js')
const keys = require('./config/keys');
const session = require('express-session');
const bodyParser = require('body-parser');
const request = require('request');
const passport = require('passport');
const mongoose = require('mongoose');
var crypto = require('crypto');

var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
// mongoose.set('debug', true);
mongoose
  .connect(process.env.MONGO_URI || keys.mongodb.url, { useNewUrlParser: true })
  .then(() => console.log('MongDB connected sucessfully'))
  .catch((err) => console.log(err));


const app = express();
userControl(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/js', express.static('js'));
app.use('/fonts', express.static('fonts'));
app.use('/css', express.static('css'));
app.use('/assets', express.static('assets'));
app.use(
  session({
    secret: keys.sessionKey.secretKey,
    resave: true,
    saveUninitialized: true
  })
);

app.set('view engine', 'ejs')

app.use(passport.initialize());
app.use(passport.session());

app.use('/libsys', router);
app.use('/admin', adminRouter);

app.get('/', (req, res)=>{
  req.session.destroy();
	res.render('index', {navs: 'home'})
})

app.listen(port, () => {
  console.log('Server is now listening to port 3000');
});
