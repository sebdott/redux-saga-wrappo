import injectSheet from 'react-jss';
import { compose, bindActionCreators } from 'redux';
import { connect as connectRedux } from 'react-redux';
import extend from 'lodash/extend';
import { reduxForm } from 'redux-form';
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

  const { mapStateToProps, mapActionToProps, mapFormToProps, mapComponentToProps, styles , reduxFormConfig } = config;
  let fullConfig = [];
  let reduxWrapper;
  let mapDispatchToPropsInner;

  if (mapActionToProps) {
    const mapDispatchActionToProps = dispatch => ({
      actions: addOnActionMapDispatchToProps(mapActionToProps, dispatch),
    });

    mapDispatchToPropsInner = dispatch =>
      addOnMapDispatchToProps(dispatch, mapDispatchActionToProps(dispatch));
  }
  else {
    mapDispatchToPropsInner = addOnMapDispatchToProps;
  }

  if (mapStateToProps) {
    reduxWrapper = connectRedux(mapStateToProps, mapDispatchToPropsInner);
  }
  else {
    reduxWrapper = connectRedux(null, mapDispatchToPropsInner);
  }

  fullConfig.push(reduxWrapper);

  if (styles) {
    const stylesWrapper = injectSheet(styles);
    fullConfig.push(stylesWrapper);
  }

  if(mapFormToProps) 
  {
    const reduxFormWrapper = reduxForm(mapFormToProps) 
    fullConfig.push(reduxFormWrapper);
  }
  return compose(...fullConfig);
}
