var React = require('react');

var getReactMixin = function (Model) {
  return {
    getInitialState: function() {
      return Model.getState();
    },

    _onChange: function () {
      this.setState(Model.getState());
    },

    componentDidMount: function () {
      Model.subscribe(this._onChange);
    },

    componentWillUnmount: function () {
      Model.unsubscribe(this._onChange);
    }
  };
};

module.exports = getReactMixin;
