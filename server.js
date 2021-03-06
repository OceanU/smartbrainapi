const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require ('./controllers/signin');
const profile = require ('./controllers/profile');
const image = require ('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'ijpbraila',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send("it's work") })
app.post('/signin', (req, res) => {signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt) }) 
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db) })
app.put('/image',(req, res) => {image.handleImage(req, res, db) })
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res) })


app.listen(process.env.PORT || 3001, ()=> {
	console.log(`app is running at port ${process.env.PORT}`)
})




/*
-->res = this is working
/sign in --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT -->user
*/