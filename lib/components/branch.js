'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = branch;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

var _utils = require('../utils');

var _types = require('../types');

var _types2 = _interopRequireDefault(_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isPlainObject = _baobab2.default.type.object;

function invalidMapping(name, mapping) {
  throw _baobab2.default.helpers.makeError('Baobab: given cursors mapping is invalid (check the "' + name + '" component).', { mapping: mapping });
}

function branch(cursors) {
  if (!isPlainObject(cursors) && typeof cursors !== 'function') {
    invalidMapping(name, cursors);
  }

  return function (Component) {
    var ComposedComponent = function (_React$Component) {
      _inherits(ComposedComponent, _React$Component);

      function ComposedComponent(props, context) {
        _classCallCheck(this, ComposedComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComposedComponent).call(this, props, context));

        if (cursors) {
          var mapping = (0, _utils.solveMapping)(cursors, props, context);

          if (!mapping) {
            invalidMapping(name, mapping);
          }

          // Creating the watcher
          _this.watcher = _this.context.tree.watch(mapping);

          // Hydrating initial state
          _this.state = _this.watcher.get();
        }
        return _this;
      }

      _createClass(ComposedComponent, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          // Creating dispatcher
          this.dispatcher = function (fn) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return fn.apply(undefined, [_this2.context.tree].concat(args));
          };

          if (!this.watcher) return;

          var handler = function handler() {
            if (_this2.watcher) _this2.setState(_this2.watcher.get());
          };

          this.watcher.on('update', handler);
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (!this.watcher) return;

          // Releasing watcher
          this.watcher.release();
          this.watcher = null;
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
          if (!this.watcher || typeof cursors !== 'function') return;

          var mapping = (0, _utils.solveMapping)(cursors, props, this.context);

          if (!mapping) invalidMapping(name, mapping);

          // Refreshing the watcher
          this.watcher.refresh(mapping);
          this.setState(this.watcher.get());
        }
      }, {
        key: 'render',
        value: function render() {
          var suppl = { dispatch: this.dispatcher };
          return _react2.default.createElement(Component, _extends({}, this.props, suppl, this.state));
        }
      }]);

      return ComposedComponent;
    }(_react2.default.Component);

    ComposedComponent.displayName = 'BaobabBranch(' + (0, _utils.getDisplayName)(Component) + ')';
    ComposedComponent.contextTypes = {
      tree: _types2.default.baobab
    };


    return ComposedComponent;
  };
}