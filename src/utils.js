export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

/**
 * Solving the mapping given to a higher-order construct.
 */
export function solveMapping(mapping, props, context) {
  if (typeof mapping === 'function') {
    mapping = mapping(props, context);
  }

  return mapping;
}
