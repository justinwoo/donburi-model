var getModel = require('donburi-model').getModel;
var Constants = require('./Constants');

var Model = getModel({
  counter: 0
});

Model.register(Constants.ADD_SOMETHING, function () {
  Model.getState().counter += 1;
});
Model.register(Constants.REMOVE_SOMETHING, function () {
  Model.getState().counter -= 1;
});

module.exports = Model;
