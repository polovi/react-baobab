import Baobab from 'baobab';

export default {
  baobab(props, propName) {
    if (!(propName in props)) {
      return;
    }

    if (!(props[propName] instanceof Baobab)) {
      return new Error(`Prop type \`${propName}\` is invalid; it must be a Baobab tree.`);
    }
  }
};
