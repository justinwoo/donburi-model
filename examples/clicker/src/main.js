var React = require('react');
var Constants = require('./Constants');
var Model = require('./Model');

// just to make sure i'm not too crazy
var clickCount = 0;

var App = React.createClass({
  getInitialState: function () {
    return Model.getState();
  },
  handleAddMore: function  () {
    Model.request(Constants.ADD_SOMETHING);
    // need to force update to show the clickcount outside of our app state
    clickCount++;
    this.forceUpdate();
  },
  handleDecrement: function () {
    Model.request(Constants.REMOVE_SOMETHING);
    clickCount--;
    this.forceUpdate();
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
        <p>Manual Counter: {clickCount}</p>
      </div>
    );
  },
  onChange: function () {
    this.setState(Model.getState());
  },
  componentDidMount: function () {
    Model.subscribe(this.onChange);
  },
  componentWillUnmount: function () {
    Model.unsubscribe(this.onChange);
  }
});

React.render(<App/>, document.body);
