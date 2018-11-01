import { combineReducers, Reducer } from 'redux';

import authReducer from './auth/reducer';
import ReduxState from './state';

const rootReducer: Reducer<ReduxState> = combineReducers<ReduxState>({
    auth: authReducer,
});

export default rootReducer;
