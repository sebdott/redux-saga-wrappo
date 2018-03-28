import injectSheet from 'react-jss';
import { compose, bindActionCreators } from 'redux';
import { connect as connectRedux } from 'react-redux';
import extend from 'lodash/extend';
import { addReducerDefaultActionType } from './generateReducers';

function addOnMapDispatchToProps(dispatch, dispatchActionCreators = undefined) {
  const defaultDispatchActionCreator = { actions: {} };

  const defaultReducerActions = addReducerDefaultActionType(global.ActionType);

  for (const [modelKey, modelValue] of Object.entries(defaultReducerActions)) {
    defaultDispatchActionCreator.actions[modelKey] = {};

    for (const [actionKey, actionvalue] of Object.entries(modelValue)) {
      defaultDispatchActionCreator.actions[modelKey][
        actionKey
      ] = bindActionCreators(actionvalue, dispatch);
    }
  }

  if (dispatchActionCreators) {
    const actions = extend(
      defaultDispatchActionCreator.actions,
      dispatchActionCreators.actions,
    );
    defaultDispatchActionCreator.actions = actions;
  }

  return defaultDispatchActionCreator;
}

function addOnActionMapDispatchToProps(listOfActions, dispatch) {
  const dispatchActionCreators = {};

  for (const [actionKey] of Object.entries(listOfActions)) {
    dispatchActionCreators[actionKey] = bindActionCreators(
      listOfActions[actionKey],
      dispatch,
    );
  }

  return dispatchActionCreators;
}

export function connect(config = null) {
  if (!config) {
    return connectRedux(null, addOnMapDispatchToProps);
  }

  const { mapStateToProps, mapActionToProps, styles } = config;
  let mapDispatchToPropsInner;
  let reduxWrapper;
  let stylesWrapper;

  if (mapActionToProps) {
    const mapDispatchActionToProps = dispatch => ({
      actions: addOnActionMapDispatchToProps(mapActionToProps, dispatch),
    });

    mapDispatchToPropsInner = dispatch =>
      addOnMapDispatchToProps(dispatch, mapDispatchActionToProps(dispatch));
  } else {
    mapDispatchToPropsInner = addOnMapDispatchToProps;
  }

  if (mapStateToProps) {
    reduxWrapper = connectRedux(mapStateToProps, mapDispatchToPropsInner);
  } else {
    reduxWrapper = connectRedux(null, mapDispatchToPropsInner);
  }

  if (styles) {
    stylesWrapper = injectSheet(styles);
    return compose(reduxWrapper, stylesWrapper);
  }

  return compose(reduxWrapper);
}
