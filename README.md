# Donburi Model [![Build Status](https://travis-ci.org/kimagure/donburi-model.svg)](https://travis-ci.org/kimagure/donburi-model)

Made by taking ideas from facebook/flux Dispatcher and the example Store and Action implementations, this module attempts to bring a simple single Model for managing application state.

The idea is to store application in one object, to provide a single source of truth. All handling functions are called by a request method and are run synchronously.

Data flow goes something like this:

```
---------     ---------------     ------------
| Model | --> | Application | --> | Requests |
---------     ---------------     ------------
   ^                                   |
   |-----------------------------------|
```


# Usage

```js
// Model.js
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
});
Model.register(Constants.REMOVE_SOMETHING, function () {
  // direct state manipulation, kind of dangerous
  Model.getState().counter -= 1;
});

module.exports = Model;
```

You can also implement a customUpdate to be called, which should be returned in your request.

```js
// App.js
var React = require('react');
var Constants = require('./Constants');
var Model = require('./Model');
var getDonburiMixin = require('donburi-model').getReactMixin;

var App = React.createClass({
  // DonburiMixin provides these methods:
  // getInitialState -- set this.state to Model.getState()
  // _onChange -- call this.setState(Model.getState())
  // componentDidMount -- subscribe to Model changes with _onChange
  // componentWillUnmount -- unsubscribe to Model changes
  mixins: [getDonburiMixin(Model)],

  handleAddMore: function  () {
    Model.request(Constants.ADD_SOMETHING);
  },
  handleDecrement: function () {
    Model.request(Constants.REMOVE_SOMETHING);
  },
  render: function () {
    return (
      <div>
        <p>
          <button onClick={this.handleAddMore}>Add more</button>
        </p>
        <p>
          <button onClick={this.handleDecrement}>Decrement</button>
        </p>
        <p>My Counter: {this.state.counter}</p>
      </div>
    );
  }
});
```

# Examples

See the tests in `modules/__tests__/DonburiModel.js` and the example application in `examples/clicker`.

# Demo

See [this](http://jsbin.com/jakoxa/2/edit?js,output) JSBin for a demo.


# References

[facebook/flux](https://github.com/facebook/flux)
