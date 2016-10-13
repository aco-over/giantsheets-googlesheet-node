var _ = require('lodash');

exports.loadFunction = function (name) {
  var ids = _.toPath(name);
  var module = require(ids[0]);
  var func = _.get(module, _.slice(ids, 1));
  return func;
}

exports.callFunction = function (name, argString) {
  var func = exports.loadFunction(name);
  var args = JSON.parse(argString);
  var ret = func.apply(undefined, _.slice(args, 1));
  return ret;
}

exports.nodeFunction = function(input) {
  try {
    var value = exports.callFunction(input.name, input.argString);
    return {
      value: JSON.stringify(value)
    }
  }
  catch (e) {
    return {
      error: {
        message: e.message,
        name: e.name,
        string: e.toString()
      }
    }
  }
}
