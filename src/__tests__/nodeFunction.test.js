var nodeFunction = require("../nodeFunction");

describe("app", function () {
  describe("loadFunction", function () {
    it("works", function () {
      var ret = nodeFunction.loadFunction('lodash.split');
      expect(ret('a.b',".")).toEqual(["a","b"]);
    });
  });
  describe("callFunction", function () {
    it("works", function () {
      var argString = JSON.stringify(['lodash.split', 'a.b', '.']);
      var ret = nodeFunction.callFunction('lodash.split', argString);
      expect(ret).toEqual(["a","b"]);
    });
  });
  describe("nodeFunction", function () {
    it("works", function () {
      var argString = JSON.stringify(['lodash.split', 'a.b', '.']);
      var input = {
        name: 'lodash.split',
        argString: argString
      }
      var ret = nodeFunction.nodeFunction(input);
      expect(ret).toEqual({value: '["a","b"]'});
    });
    it("handles errors in the called function", function () {
      // TODO figure out how to create an error
      var argString = JSON.stringify(['lodash.spli.t', 'a.b', '.']);
      var input = {
        name: 'lodash.spli.t',
        argString: argString
      }
      var ret = nodeFunction.nodeFunction(input);
      expect(ret.error).toBeTruthy();
      expect(ret.value).toBeFalsy();
      expect(ret.error).toEqual({"message": "Cannot read property \'apply\' of undefined", "name": "TypeError", "string": "TypeError: Cannot read property \'apply\' of undefined"});
    });
  });
});
