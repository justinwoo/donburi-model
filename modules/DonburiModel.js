// application model interface for app state changes
// imitates the facebook/flux Dispatcher implementation somewhat for job handling
// and the example Store implementations
// this is basically the Store, Dispatcher, and Actions smashed into one object
// for workflows that fit how I currently use Flux.
function getModel (initialState) {
  // callbacks to be registered to model
  var callbacks = [];
  // jobs to be queued up and run
  var jobs = [];
  // busy flag, prevent two jobs from running simultaneously
  var busy = false;
  // model state
  var state = initialState || {};
  // request handlers
  var handlers = {};

  // runs queued up jobs appropriately
  function doJobs() {
    if (busy === false && jobs.length > 0) {
      var job = jobs.pop();
      busy = true;
      var customUpdate = handlers[job.key](job.payload);
      if (typeof customUpdate === 'undefined') {
        Model.update();
      } else {
        customUpdate();
      }
    }
  }

  // Model object to be returned
  var Model = {
    // subscribe update callback
    // fn (callback: fn)
    subscribe: function (callback) {
      callbacks.push(callback);
    },

    // unsubscribe callback from updates
    // fn (callback: fn)
    unsubscribe: function (callback) {
      callbacks = callbacks.filter(function (a) {
        return a !== callback;
      });
    },

    // update method sets the busy flag back and runs callbacks
    // kicks off jobs to be run when finished
    update: function () {
      busy = false;
      callbacks.forEach(function (callback) {
        callback();
      });
      doJobs();
    },

    // getter for the application state
    // fn -> object
    getState: function () {
      return state;
    },

    // setter for the application state
    // fn (newState: object)
    setState: function (newState) {
      state = newState;
    },

    // request that a handler be called
    // also kicks off jobs that need to be run
    // fn (key: any, payload: object)
    request: function (key, payload) {
      jobs.unshift({key: key, payload: payload});
      doJobs();
    },

    // register a handler
    // fn (key: any, handler: fn (payload: object))
    register: function (key, payload) {
      handlers[key] = payload;
    }
  };

  // return our model
  return Model;
}

var DonburiModel = {
  getModel: getModel
};

module.exports = DonburiModel;
