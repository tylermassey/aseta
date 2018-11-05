import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import ExpenseService from './api/expenses/service';
import App from './components/App';
import env from './env/env';
import { initFirebase } from './firebase';
import './index.css';
import { getStore, initStore } from './redux/store';

initFirebase(env.firebase);
initStore();

const expenseService = new ExpenseService();

ReactDOM.render(
    <Provider store={getStore()}>
        <App expenseService={expenseService} />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
