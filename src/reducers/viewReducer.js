import initialState from './initialState';
import * as actionTypes from '../constants/actionTypes';

export default function (state = initialState.view, action) {
  switch (action.type) {
    case actionTypes.SWITCH_CHARTS_MODE:
      return {...state, chartsStacked: !state.chartsStacked};
    case actionTypes.SELECT_TAB:
      return {...state, tabsIndex: action.index};
    default:
      return state;
  }
}
