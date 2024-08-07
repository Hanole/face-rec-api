const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const { handleImage, handleApiCall } = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
  },
});

db.select('*').from('users').then(data => {
});

const app = express()

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => { res.send('it is working!')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage (req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

const PORT = process.env.PORT
app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is listening on port ${process.env.PORT}`);
})

console.log(PORT)

