'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = root;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../utils');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function root(tree) {
  return function (Component) {
    var ComposedComponent = function (_React$Component) {
      _inherits(ComposedComponent, _React$Component);

      function ComposedComponent() {
        _classCallCheck(this, ComposedComponent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ComposedComponent).apply(this, arguments));
      }

      _createClass(ComposedComponent, [{
        key: 'getChildContext',
        value: function getChildContext() {
          return { tree: tree };
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(Component, null);
        }
      }]);

      return ComposedComponent;
    }(_react2.default.Component);

    ComposedComponent.displayName = 'BaobabRoot(' + (0, _utils.getDisplayName)(Component) + ')';
    ComposedComponent.childContextTypes = {
      tree: _types2.default.baobab
    };


    return ComposedComponent;
  };
}