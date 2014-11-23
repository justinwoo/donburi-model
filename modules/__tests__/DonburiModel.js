jest.dontMock('../DonburiModel');
var DonburiModel = require('../DonburiModel');

describe('DonburiModel', function () {
  it('instantiates correctly', function () {
    expect(DonburiModel).toBeDefined();
    expect(DonburiModel.getModel).toBeDefined();

    var Model = DonburiModel.getModel();
    expect(Model.getState).toBeDefined();
    expect(Model.getState()).toBeDefined();
  });

  it('can register handlers that get handled correctly', function () {
    var Constants = {
      ADD_SOMETHING: 'ADD_SOMETHING',
      REMOVE_SOMETHING: 'REMOVE_SOMETHING'
    };

    var Model = DonburiModel.getModel({counter: 0});
    Model.register(Constants.ADD_SOMETHING, function () {
      var state = Model.getState();
      state.counter += 1;
      // this setState is unnecessary when mutating the object in place
      // or choosing to update the state carefully yourself
      // however, setting the state with a new state will help
      // in usages such as ReactComponentWithPureRenderMixin
      Model.setState(state);
      Model.update();
    });
    Model.register(Constants.REMOVE_SOMETHING, function () {
      var state = Model.getState();
      state.counter -= 1;
      Model.setState(state);
      Model.update();
    });

    expect(Model.getState().counter).toBe(0);
    Model.request(Constants.ADD_SOMETHING);
    expect(Model.getState().counter).toBe(1);
    Model.request(Constants.REMOVE_SOMETHING);
    expect(Model.getState().counter).toBe(0);
  });

  it('can handle custom update handlers', function () {
    var Model = DonburiModel.getModel({counter: 0});
    Model.customUpdate = function () {
      Model.getState().counter += 2;
      Model.update();
    }
    Model.register('update', function () {
      Model.customUpdate();
    });
    expect(Model.getState().counter).toBe(0);
    Model.request('update');
    expect(Model.getState().counter).toBe(2);
  });
});
