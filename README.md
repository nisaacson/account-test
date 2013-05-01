# Account Test
Test suite for account interface implementations. This module is intended to be used in a mocha-based test suite for a specific account implementation. See the [account-couch](https://github.com/nisaacson/account-couch) module for an example

# Usage

```javascript
// instatiate a new Account Redis object
var AccountRedis = require('account-redis')
var accountRedis = new AccountRedis(host, port, opts)
describe('Account Redis Implementation Test', function () {
  var testLib = require('account-test')
  // run all the interface tests using the instatiated account redis module
  testLib(accountReids)
})
```
