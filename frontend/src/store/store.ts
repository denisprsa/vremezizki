import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { RootAction, RootState, Services } from 'StoreTypes';
import { rootReducer } from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

// Configure middleware
export const history = createBrowserHistory();
export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
    dependencies: services,
});
const middleware = [
    routerMiddleware(history),
    epicMiddleware
];

// Enhancers
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {};

// Store
const store = createStore(
    rootReducer(history),
    initialState,
    composeEnhancers(applyMiddleware(...middleware)),
);

store.subscribe(() => {
    // Empty for now
});

epicMiddleware.run(rootEpic);

export default store;
