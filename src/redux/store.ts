import { createStore, Store } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './rootReducer';
import ReduxState from './state';

let store: Store<ReduxState>;

const initStore = () => {
    const persistConfig = {
        key: 'root',
        storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    store = createStore(persistedReducer);
};

const getStore = (): Store<ReduxState> => store;

const getPersistor = () => persistStore(store);

export { initStore, getPersistor, getStore };
