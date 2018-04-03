import _regeneratorRuntime from "@babel/runtime/regenerator";

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

import Fingerprint2 from 'fingerprintjs2';

var getFingerprint = function getFingerprint() {
  return new Promise(function (resolve) {
    new Fingerprint2().get(function (result) {
      return resolve(result);
    });
  });
};

export var getDeviceToken =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(procesDeviceToken) {
    var deviceToken;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getFingerprint();

          case 2:
            deviceToken = _context.sent;

            if (procesDeviceToken) {
              procesDeviceToken(deviceToken);
            }

            return _context.abrupt("return", deviceToken);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getDeviceToken(_x) {
    return _ref.apply(this, arguments);
  };
}();