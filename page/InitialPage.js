function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { connect } from '../connect';
import { getDeviceToken } from '../utils/validation';

var InitialPage =
/*#__PURE__*/
function (_Component) {
  _inherits(InitialPage, _Component);

  function InitialPage() {
    _classCallCheck(this, InitialPage);

    return _possibleConstructorReturn(this, (InitialPage.__proto__ || Object.getPrototypeOf(InitialPage)).apply(this, arguments));
  }

  _createClass(InitialPage, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var actions = this.props.actions;
      getDeviceToken(function (deviceToken) {
        actions.appModel.updateState({
          deviceToken: deviceToken
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.props.children;
      return React.createElement("div", null, children);
    }
  }]);

  return InitialPage;
}(Component);

export default connect()(InitialPage);