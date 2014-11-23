# Donburi Model [![Build Status](https://travis-ci.org/kimagure/donburi-model.svg)](https://travis-ci.org/kimagure/donburi-model)

Made by taking ideas from facebook/flux Dispatcher and the example Store and Action implementations, this module attempts to bring a simple single Model for managing application state.

The idea is to store application in one object, to provide a single source of truth. All handling functions are called by a request method and are run synchronously.


# Usage

```js
var getModel = require('donburi-model').getModel;
var Constants = require('./Constants');

function addOne(operand) {
  return operand + 1;
}

var Model = getModel({
  counter: 0
});

Model.register(Constants.ADD_SOMETHING, function () {
  var state = Model.getState();
  // controlled mutation by getting a result from a pure function
  state.counter = addOne(state.counter);
  Model.update();
});
Model.register(Constants.REMOVE_SOMETHING, function () {
  Model.getState().counter -= 1;
  Model.update();
});

module.exports = Model;
```


# Examples

See the tests in `modules/__tests__/DonburiModel.js` and the example application in `examples/clicker`.

# Demo

See [this](http://jsbin.com/jakoxa/1/edit?js,output) JSBin for a demo.


# References

[facebook/flux](https://github.com/facebook/flux)
