import { createReducer } from 'typesafe-actions';
import { combineReducers } from 'redux';

import { changeThemeAction } from './actions';
import { getTheme } from './get-theme';

export const theme = combineReducers({
  isDark: createReducer(true)
    .handleAction(changeThemeAction, (state) => {
      return state ? false : true;
    }),
  theme: createReducer(getTheme(true))
    .handleAction(changeThemeAction, (state) => {
      const { palette: { type } } = state;
      if (type === 'dark') {
        return getTheme(false);
      }
      return getTheme(true);
    })
});
