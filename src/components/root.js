import React from 'react'
import {getDisplayName} from '../utils'
import PropTypes from '../types'

export default function root(tree) {
  return (Component) => {
    class ComposedComponent extends React.Component {
      static displayName = `BaobabRoot(${getDisplayName(Component)})`;

      static childContextTypes = {
        tree: PropTypes.baobab
      }

      getChildContext() {
        return {tree};
      }

      render() {
        return <Component />;
      }
    }

    return ComposedComponent;
  };
}
