var assert = require('assert');
var ObjectA = require('../src/ObjectA');
var stub = require('../src/stub');
describe('stubs', function() {
  describe('an unstubed method', function() {
    it('returns an unmodified value', function() {
      assert.equal('this is a method', ObjectA.aMethod());
    });
  });

  describe('a stubbed method', function () {
    var original = ObjectA.aMethod;
    afterEach(function() { ObjectA.aMethod = original; });

    it('does not return its original value', function() {
      stub(ObjectA, 'aMethod');

      assert.equal(undefined, ObjectA.aMethod());
    });

    it('can have replaced funcitonality', function() {
      stub(ObjectA, 'aMethod', function() {
        return "this is a stub"
      });

      assert.equal(undefined, ObjectA.aMethod());
    });

    it('will identify that it was called', function () {
      var stubbedMethod = stub(ObjectA, 'aMethod');

      ObjectA.aMethod();

      assert.equal(stubbedMethod.called, true);
    });

    it('will identify that is was called twice', function () {
      var stubbedMethod = stub(ObjectA, 'aMethod');

      ObjectA.aMethod();
      assert.equal(stubbedMethod.calledOnce, true);

      ObjectA.aMethod();

      assert.equal(stubbedMethod.calledTwice, true);
      assert.equal(stubbedMethod.calls, 2);
    });

    it('can restore original', function () {
      stub(ObjectA, 'aMethod');

      ObjectA.aMethod();
      assert.equal(ObjectA.aMethod.calledOnce, true);
      assert.notEqual(ObjectA.aMethod, original);

      ObjectA.aMethod.restore();

      assert.equal(ObjectA.aMethod.calledOnce, void(0));
      assert.equal(ObjectA.aMethod, original);
    });

    it('returns stubbed function\'s return', function() {
      stub(ObjectA, 'aMethod', function() { return "Hello World" });

      var returnValue = ObjectA.aMethod();
      assert.equal(returnValue, undefined);
      assert.equal(ObjectA.aMethod.calledOnce, true);
      assert.notEqual(ObjectA.aMethod, original);

      ObjectA.aMethod.restore();

      assert.equal(ObjectA.aMethod.calledOnce, void(0));
      assert.equal(ObjectA.aMethod, original);
    });

    it('can have a predefined return value', function() {
      stub(ObjectA, 'aMethod').returns("Hello World");

      var returnValue = ObjectA.aMethod();
      assert.equal(returnValue, "Hello World");
      assert.equal(ObjectA.aMethod.calledOnce, true);
      assert.notEqual(ObjectA.aMethod, original);

      ObjectA.aMethod.restore();

      assert.equal(ObjectA.aMethod.calledOnce, void(0));
      assert.equal(ObjectA.aMethod, original);
    });

    it('can have override a stubbed fuunction\'s return value', function() {
      stub(ObjectA, 'aMethod', function() {
        return "Goodbye";
      }).returns("Hello World");

      var returnValue = ObjectA.aMethod();
      assert.equal(returnValue, "Hello World");
      assert.equal(ObjectA.aMethod.calledOnce, true);
      assert.notEqual(ObjectA.aMethod, original);

      ObjectA.aMethod.restore();

      assert.equal(ObjectA.aMethod.calledOnce, void(0));
      assert.equal(ObjectA.aMethod, original);
    });
  });
});
