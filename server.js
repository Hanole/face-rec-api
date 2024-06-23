const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');

const app = express()


app.use(express.json());
const database = {
	users: [
		{
			id: '123',
			name: 'ole',
			email: 'ole123@hotmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '321',
			name: 'hanne',
			email: 'hanne@hotmail.com',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
			{
			id: '987',
			has: '',
			email: 'ole@bole.no'
			}
		]
}
app.use(cors());

app.get('/', (req, res)=> {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	bcrypt.compare("redbull",'$2a$10$aGmjO1ybiSTSJEj1n66MF.KSWb8AEG4BIS6wqVWim4M/qeaYqwm8a', function(err, res) {
    console.log('first guess', res)
});
	bcrypt.compare("veggies", '$2a$10$aGmjO1ybiSTSJEj1n66MF.KSWb8AEG4BIS6wqVWim4M/qeaYqwm8a', function(err, res) {
    console.log('second guess', res)
});
	if (req.body.email === database.users[0].email && 
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res) => {
	const { email, name, password } = req.body;
	database.users.push({
		id: '456',
		name: name,
		email: email,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})


app.post('/image', (req, res) => {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if (user.id === id) {
			found = true
			user.entries++
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

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

app.listen(3001, () => {
	console.log('working on port 3001');
})

