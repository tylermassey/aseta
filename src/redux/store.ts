import { createStore, Store } from 'redux';

import rootReducer from './rootReducer';
import ReduxState from './state';

let store: Store<ReduxState>;

const initStore = () => {
    store = createStore(rootReducer);
};

const getStore = (): Store<ReduxState> => store;

export { initStore, getStore };
