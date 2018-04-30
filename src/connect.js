import { compose, bindActionCreators } from 'redux';
import { connect as connectRedux } from 'react-redux';
import extend from 'lodash-es/extend';
import merge from 'lodash-es/merge';
import { reduxForm } from 'redux-form';
import { addReducerDefaultActionType } from './generateReducers';

function addOnMapDispatchToProps(dispatch, dispatchActionCreators = undefined) {
  let defaultDispatchActionCreator = {};
  const defaultReducerActions = addReducerDefaultActionType();
  for (const [modelKey, modelValue] of Object.entries(defaultReducerActions)) {
    defaultDispatchActionCreator[modelKey] = {};

    for (const [actionKey, actionvalue] of Object.entries(modelValue)) {
      defaultDispatchActionCreator[modelKey][
        actionKey
      ] = bindActionCreators(actionvalue, dispatch);
    }
  }
  if (dispatchActionCreators) {
    const actions = extend(
      defaultDispatchActionCreator,
      { ...dispatchActionCreators },
    );
    defaultDispatchActionCreator = { ...actions };
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

export default function connect(config = null) {
  if (!config) {
    return connectRedux(null, addOnMapDispatchToProps);
  }

  const { mapStateToProps, mapActionToProps, mapFormToProps, disabledDefaultAction } = config;
  const fullConfig = [];
  let reduxWrapper;
  let mapDispatchToPropsInner;

  if (mapActionToProps) {
    const mapDispatchActionToProps = dispatch => ({
      ...addOnActionMapDispatchToProps(mapActionToProps, dispatch),
    });

    mapDispatchToPropsInner = dispatch =>
      addOnMapDispatchToProps(dispatch, mapDispatchActionToProps(dispatch));
  }
  else {
    mapDispatchToPropsInner = addOnMapDispatchToProps;
  }

  const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const mergeStateDispatchProps = merge(stateProps, dispatchProps);
    return Object.assign({}, ownProps, mergeStateDispatchProps);
  };

  if (mapStateToProps) {
    const areStatesEqual = (next, prev) => {
      return !(next.form === prev.form);
    };

    const connectOptions = { areStatesEqual };
    reduxWrapper = connectRedux(mapStateToProps, mapDispatchToPropsInner, mergeProps, connectOptions);
  }
  else {
    reduxWrapper = connectRedux(null, mapDispatchToPropsInner);
  }

  if (!disabledDefaultAction) {
    fullConfig.push(reduxWrapper);
  }

  if (mapFormToProps) {
    const reduxFormWrapper = reduxForm(mapFormToProps);
    fullConfig.push(reduxFormWrapper);
  }

  return compose(...fullConfig);
}
