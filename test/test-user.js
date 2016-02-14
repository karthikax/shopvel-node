'use strict';

/**
 * Module dependencies.
 */

const test = require('ava');

test('Test user', t => {
	t.pass('Passed');
});

// const mongoose = require('mongoose');
// const test = require('ava');
// const request = require('supertest');
// const app = require('../app');
// const User = mongoose.model('User');

// test.cb('No Password', t => {
// 	request(app)
// 	.post('/login')
// 	.field('username', 'admin')
// 	.field('password', '')
// 	.expect(/Found. Redirecting to \/login/)
// 	.end(async err => {
// 		const count = await User.count().exec();
// 		t.ifError(err);
// 		t.same(count, 0, 'count of users should be 0');
// 		t.end();
// 	});
// });