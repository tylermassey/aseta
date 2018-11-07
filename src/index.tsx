import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import CategoryService from './api/categories/service';
import ExpenseService from './api/expenses/service';
import App from './components/App';
import env from './env/env';
import { initFirebase } from './firebase';
import { getStore, initStore } from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

initFirebase(env.firebase);
initStore();

const expenseService = new ExpenseService();
const categoryService = new CategoryService();

ReactDOM.render(
    <Provider store={getStore()}>
        <App
            categoryService={categoryService}
            expenseService={expenseService}
        />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
