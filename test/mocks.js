var _ = require('lodash');
var assert = require('assert');
var storage = require('../src/storage');

describe('mocks', function() {
  describe('a mocked resource', function () {
    it('allows us to create side-effect boundaries', function() {
      function LocalStorageMock() {};
      LocalStorageMock.prototype.setItem = function() {};
      LocalStorageMock.prototype.getItem = function () {};
      LocalStorageMock.prototype.removeItem = function () {};

      global.localStorage = new LocalStorageMock();

      storage.store('help', 'socorro');
    });

    it('allows us to create in-memory versions of external services', function() {
      var MemoryStorageMock = (function() {
        const store = {};
        function MemoryStorageMock() {};
        MemoryStorageMock.prototype.setItem = function(key, value) {
          store[key] = value;
        };
        MemoryStorageMock.prototype.getItem = function (key) {
          return store[key];
        };
        MemoryStorageMock.prototype.removeItem = function (key) {
          delete store[key];
        };

        return MemoryStorageMock;
      })()

      global.localStorage = new MemoryStorageMock();

      storage.store('help', 'socorro');
      assert.equal(storage.retrieve('help'), 'socorro');
    });
  });
});
