require('dotenv').config();
const express = require('express')
const app = express()
// const PORT = 4000
app.set('port', process.env.PORT || 4000);
const cors = require('cors')
const carController = require('./controllers/carController')

const SESSION_SECRET = process.env.SESSION_SECRET;

const userRoute = require('./controllers/sessions')
const session = require('express-session');
// const customCar = require('./controllers/customCar')
const adminRoute = require('./controllers/adminSession')

var whitelist = [
  'http://localhost:3000',
  'https://cardealerone.herokuapp.com/'
];
var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
  
  app.use((req, res, next) => {
    res.locals.username = req.session.username;
    res.locals.loggedIn = req.session.loggedIn;
    next();
  });
  app.use((req, res, next) => {
    res.locals.message = req.session.message;
    req.session.message = '';
    next();
  });

  


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/session', adminRoute)
// app.use('/custom', customCar)
app.use('/session', userRoute)
app.use('/cars', carController)

// app.listen(PORT, () => {
//     console.log('running on', PORT);
// })

app.listen(app.get('port'), () => {
  console.log(`get yer car on: , ${app.get('port')}`);
});