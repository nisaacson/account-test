var should = require('should');
module.exports = function (account, data) {
  beforeEach(function (done) {
    account.removeUser(data, done)
  })
  it('should register user correctly', function (done) {
    this.timeout(0)
    account.register(data, function (err, reply) {
      should.not.exist(err, 'error registering user account: ' + JSON.stringify(err, null, ' '))
      done()
    })
  })
  it('should give error when registering user with same email as existing user', function (done) {
    this.timeout(0)
    account.register(data, function (err, reply) {
      should.not.exist(err, 'error registering user account: ' + JSON.stringify(err, null, ' '))
      account.register(data, function (err, reply) {
        should.exist(err)
        done()
      })
    })
  })

  it('should login user correctly', function (done) {
    this.timeout(0)
    account.register(data, function (err, reply) {
      should.not.exist(err, 'error registering user account: ' + JSON.stringify(err, null, ' '))
      account.login(data, function (err, reply) {
        should.not.exist(err, 'error in login for user account: ' + JSON.stringify(err, null, ' '))
        done()
      })
    })
  })

  it('should serialize user correctly', function (done) {
    this.timeout(0)
    account.register(data, function (err, reply) {
      should.not.exist(err, 'error registering user account: ' + JSON.stringify(err, null, ' '))
      account.serializeUser(data, function (err, id) {
        should.not.exist(err, 'error when performing serialize user account: ' + JSON.stringify(err, null, ' '))
        should.exist(id, 'serializeUser should return an id')
        done()
      })
    })
  })

  it('should deserialize user correctly', function (done) {
    this.timeout(0)
    account.register(data, function (err, reply) {
      should.not.exist(err, 'error registering user account: ' + JSON.stringify(err, null, ' '))
      account.serializeUser(data, function (err, id) {
        should.exist(id, 'serializeUser should return an id')
        account.deserializeUser(id, function (err, reply) {
          should.not.exist(err, 'error when performing serialize user account: ' + JSON.stringify(err, null, ' '))
          done()
        })
      })
    })
  })
  it('should give error when attempting to deserialize a user which does not exist', function (done) {
    this.timeout(0)
    var id = 'fooID'
    account.deserializeUser(id, function (err, reply) {
      should.exist(err)
      done()
    })
  })
}
