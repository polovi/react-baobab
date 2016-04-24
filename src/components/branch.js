import React from 'react';
import Baobab from 'baobab';
import {getDisplayName, solveMapping} from '../utils';
import PropTypes from '../types'

const isPlainObject = Baobab.type.object;

function invalidMapping(name, mapping) {
  throw Baobab.helpers.makeError(
    'Baobab: given cursors mapping is invalid (check the "' + name + '" component).',
    {mapping}
  );
}

export default function branch(cursors) {
  if (!isPlainObject(cursors) && typeof cursors !== 'function') {
    invalidMapping(name, cursors);
  }

  return (Component) => {
    class ComposedComponent extends React.Component {
      static displayName = `BaobabBranch(${getDisplayName(Component)})`;

      static contextTypes = {
        tree: PropTypes.baobab
      }

      constructor(props, context) {
        super(props, context);

        if (cursors) {
          const mapping = solveMapping(cursors, props, context);

          if (!mapping) {
            invalidMapping(name, mapping);
          }

          // Creating the watcher
          this.watcher = this.context.tree.watch(mapping);

          // Hydrating initial state
          this.state = this.watcher.get();
        }
      }

      componentWillMount() {
       // Creating dispatcher
       this.dispatcher = (fn, ...args) => fn(this.context.tree, ...args);

       if (!this.watcher)
         return;

       const handler = () => {
         if (this.watcher)
           this.setState(this.watcher.get());
       };

       this.watcher.on('update', handler);
      }

      componentWillUnmount() {
        if (!this.watcher)
          return;

        // Releasing watcher
        this.watcher.release();
        this.watcher = null;
      }

      componentWillReceiveProps(props) {
        if (!this.watcher || typeof cursors !== 'function')
          return;

        const mapping = solveMapping(cursors, props, this.context);

        if (!mapping)
          invalidMapping(name, mapping);

        // Refreshing the watcher
        this.watcher.refresh(mapping);
        this.setState(this.watcher.get());
      }

      render() {
        const suppl = {dispatch: this.dispatcher};
        return <Component {...this.props} {...suppl} {...this.state} />;
      }

    }

    return ComposedComponent;
  }
}
