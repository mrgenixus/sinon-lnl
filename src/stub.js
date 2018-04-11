var _ = require('lodash');
module.exports = function stub(obj, methodname, replacementMethod) {
  replacementMethod = replacementMethod===void(0) ? function() {} : replacementMethod;
  function proxy() {
    proxy.called = true;
    proxy.calls = proxy.calls + 1;
    proxy.calledOnce = proxy.calls === 1;
    proxy.calledTwice = proxy.calls === 2;
    return replacementMethod.apply(this, arguments);
  };

  proxy.restore = (function(originalMethod) {
    return function restore() {
      obj[methodname] = originalMethod;
      return proxy;
    };
  })(obj[methodname]);

  obj[methodname] = proxy;
  proxy.calls = 0;
  return proxy;
}
