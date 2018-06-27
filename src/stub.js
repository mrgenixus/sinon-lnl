var _ = require('lodash');
function stub(obj, methodname, replacementMethod) {
  replacementMethod = replacementMethod===void(0) ? _.noop : replacementMethod;

  proxy.restore = (function(originalMethod) {
    return function restore() {
      obj[methodname] = originalMethod;
      return proxy;
    };
  })(obj[methodname]);

  var returnValue;
  var returns = false;
  proxy.returns = function(value) {
    returnValue = value;
    returns = true;
  }

  obj[methodname] = proxy;
  proxy.calls = 0;
  return proxy;

  function proxy() {
    proxy.called = true;
    proxy.calls = proxy.calls + 1;
    proxy.calledOnce = proxy.calls === 1;
    proxy.calledTwice = proxy.calls === 2;

    replacementMethod.apply(this, arguments);
    if (returns) return returnValue;
  }
}
module.exports = stub;
module.exports.spy = function(obj, method) {
  if (obj === undefined) obj = function() {}
  if (!method && _.isFunciton(obj)) {
    method = obj;
    obj = { method: method}
  };

  return stub(obj, method, obj[method]);
}
