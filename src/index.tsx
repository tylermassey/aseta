import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import env from './env/env';
import { initFirebase } from './firebase';
import './index.css';
import { getStore, initStore } from './redux/store';

initFirebase(env.firebase);
initStore();

ReactDOM.render(
    <Provider store={getStore()}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
