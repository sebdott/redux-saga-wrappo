Redux-Saga-Wrappo
=============

[![build status](https://img.shields.io/travis/codedsphere/redux-saga-wrappo/master.svg?style=flat-square)](https://travis-ci.org/codedsphere/redux-saga-wrappo) 
[![npm version](https://img.shields.io/npm/v/redux-saga-wrappo.svg?style=flat-square)](https://www.npmjs.com/package/redux-saga-wrappo)
[![npm downloads](https://img.shields.io/npm/dm/redux-saga-wrappo.svg?style=flat-square)](https://www.npmjs.com/package/redux-saga-wrappo)

```js
npm install --save redux-saga-wrappo
yarn add redux-saga-wrappo
```

## What is this?

This is a wrapper around Redux Saga, which enables you to 
1. Easily dispatch your actions
2. Retrieve your reducers states easily in your components
3. Dynamic component fetching.

## Use Me ?
Probably yes, probably not :) 
This is actually a private project, created for our own usage. 
You can use it, but it will not have really proper documentation. 
We will try our best to work on this repo to improve it in the future.

## Installation

```
npm install --save redux-saga-wrappo
```

Then, to enable Redux-Saga-Wrappo, 

```js
//Index.js 
import '@babel/polyfill';
import React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import { appCreator } from 'redux-saga-wrappo/appCreator';

// App init 
appCreator(
  <ConnectedRouter history={history}>
    <Route path="/" component={App} />
  </ConnectedRouter>,
  document.getElementById('root'),
  { rootSaga, rootReducer },
);

```

## Sample Code

In Progress.

```js
class Example extends PureComponent {
  componentWillMount = () => {
    const { actions } = this.props;
    actions.exampleModel.updateState({ somethingNew: 'new day' });
    actions.exampleModel.removeState(['somethingNew']);
    actions.userModel.updateState({ name: 'codedsphere' });
    actions.userModel.initializeAll();
    actions.authenticationSaga.Login(1);
    actions.authenticationSaga.getValidatePic();
    actions.exampleReducer.Other_Reducer();
  };
  render() {
    const { exampleModel } = this.props;
    const { webUniqueCodea, webUniqueCodeb } = exampleModel;
    const { Default } = this.props.layouts;
    return (
      <Default>{JSON.stringify({ webUniqueCodea, webUniqueCodeb })}</Default>
    );
  }
}

const connectConfig = {
  mapActionToProps: { authenticationSaga, exampleReducer },
  mapStateToProps: ({ userModel, exampleModel }) => ({
    userModel,
    exampleModel,
  }),
};

export default getClientItem(['layouts'])(connect(connectConfig)(Example));
```

l