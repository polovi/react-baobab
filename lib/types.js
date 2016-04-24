'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baobab = require('baobab');

var _baobab2 = _interopRequireDefault(_baobab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  baobab: function baobab(props, propName) {
    if (!(propName in props)) {
      return;
    }

    if (!(props[propName] instanceof _baobab2.default)) {
      return new Error('Prop type `' + propName + '` is invalid; it must be a Baobab tree.');
    }
  }
};