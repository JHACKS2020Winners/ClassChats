let express = require('express');
let router = express.Router();

router.route('/')
	.get(function (req, res) {
		res.render('index');
	});

router.route('/login')
	.get(function (req, res) {
		res.render('login');
	})
	.post(function (req, res) {
		let username = req.body.username;
		let password = req.body.password;
		
		if (username === undefined || password === undefined) {
			res.render('login', { error: "You need to enter a username and password."});
		}

		verifyCredentials(username, password, function(err, verified) {
			if (err) {
				res.render('login', { error: err});
				return;
			}
			
			getUserUniversity(username, function(err, university) {
				app.session.domain = university;
				res.redirect('/' + university);
			})
		})
	});

router.route('/signup')
	.get(function (req, res){
		res.render('register');
	})
	.post(function (req, res){
		let username = req.body.username;
		let password = req.body.password;
		let passwordConfirm = req.body.passwordConfirm;
		
		if (username === undefined || password === undefined) {
			res.render('signup', { error: "You need to enter a username and password."});
			return;
		}
		if (password !== passwordConfirm) {
			res.render('signup', { error: "'Password' and 'Confirm Password' must match."});
			return;
		}
		
		createAccount(username, password, function(err, result) {
			if (err) {
				res.render('signup', { error: err});
			} else {
				res.redirect('/validate');
			}
		});
	});

router.route('/validate')
	.get(function (req, res) {
		render('validate');
	})
	.post(function (req, res) {
		let code = req.body.code;
		verify(username, code, function(err, verified) {
			let university = res.locals.domain;
			app.session.university = university;
			res.redirect('/' + university);
		});
	});
	
module.exports = router;