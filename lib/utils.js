'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDisplayName = getDisplayName;
exports.solveMapping = solveMapping;
function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

/**
 * Solving the mapping given to a higher-order construct.
 */
function solveMapping(mapping, props, context) {
  if (typeof mapping === 'function') {
    mapping = mapping(props, context);
  }

  return mapping;
}