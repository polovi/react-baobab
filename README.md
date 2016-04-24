# react-baobab
JS decorators for [Baobab](https://github.com/Yomguithereal/baobab/tree/v2) based on [baobab-react](https://github.com/Yomguithereal/baobab-react).

## Install
```cmd
$ npm install --save react-baobab

```

## Usage

*state.js*
```js
import Baobab from 'baobab'

const tree = new Baobab({
  colors: ['red', 'green', 'blue']
});

export default tree;
```

*customComponent.js*
```js
import React, {Component} from 'react'
import {branch} from 'react-baobab'

function addColor(tree, color) {
  tree.select('colors').push(color);
}

@branch({
  colors: ['colors']
})
class CustomComponent extends Component {
  componentDidMount() {
    console.log(this.props.colors); // return ['red', 'green', 'blue']
    this.props.dispatch(addColor, 'orange'); // dispatch action addColor with new color
  }

  ...
}
```

*app.js*
```js
import React, {Component} from 'react'
import {root} from 'react-baobab'
import tree from './state'
import CustomComponent from './customComponent'

@root(tree)
class CustomComponent extends Component {
  
  ...
}
```

## License
Released under the MIT license.
