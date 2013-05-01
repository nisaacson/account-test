var assert = require('assert')
var inspect = require('eyespect').inspector();
var Account = require('account')
var AccountFoo = function() {}
AccountFoo.prototype = Object.create(Account)
var registerCalled, loginCalled, deserializeUserCalled, serializeUserCalled
registerCalled = loginCalled = deserializeUserCalled = serializeUserCalled = false

var profile = {
  email: 'foo@example.com',
  password: 'barPassword',
  _id: 'fooID'
}

var users = {}
var usersByID = {}
AccountFoo.prototype.register = function (data, cb) {
  registerCalled = true
  var email = data.email
  var existingUser = users[email]
  if (existingUser) {
    return cb({
      message: 'register failed',
      error: 'email address is already registered',
      stack: new Error().stack
    })
  }
  users[email] = profile
  cb()
}
AccountFoo.prototype.login = function (data, cb) {
  loginCalled = true
  var email = data.email
  var existingUser = profile[email]
  if (existingUser) {
    return cb(null, existingUser)
  }
  cb()
}


AccountFoo.prototype.serializeUser = function (data, cb) {
  serializeUserCalled = true
  var id = data._id
  usersByID[id] = profile
  cb(null, id)
}
AccountFoo.prototype.deserializeUser = function (id, cb) {
  deserializeUserCalled = true
  var user = usersByID[id]
  if (!user) {
    return cb({
      message: 'failed to deserializeUser',
      error: 'user not found with given id',
      stack: new Error().stack
    })
  }
  cb(null, user)
}

AccountFoo.prototype.removeUser = function (data, cb) {
  var id = data._id
  var email = data.email
  delete users[email]
  delete usersByID[id]
  cb()
}

describe('Account Interface Test Wiring', function () {
  var account = new AccountFoo()
  var testLib = require('../')
  testLib(account, profile)
  after(function () {
    assert.ok(registerCalled, 'register function never called')
    assert.ok(loginCalled, 'login function never called')
    assert.ok(deserializeUserCalled, 'deserializeUser function never called')
    assert.ok(serializeUserCalled, 'serializeUser function never called')
  })
})
