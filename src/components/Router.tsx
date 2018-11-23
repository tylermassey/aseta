import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CategoryService from '../api/categories/service';
import ExpenseService from '../api/expenses/service';
import { MediaSizes } from '../utils/mediaWatcher';
import AddExpensePage from './AddExpensePage';
import AllExpensesPage from './AllExpensesPage';
import MetricsPage from './MetricsPage';
import Skeleton from './Skeleton';

interface OwnProps {
    categoryService: CategoryService;
    expenseService: ExpenseService;
    mediaSize?: MediaSizes;
}

const Router: React.StatelessComponent<OwnProps> = ({
    categoryService,
    expenseService,
    mediaSize,
}) => (
    <BrowserRouter>
        <Switch>
            <Route
                path="/expenses"
                component={() => (
                    <Skeleton
                        mediaSize={mediaSize || MediaSizes.xs}
                        content={
                            <AllExpensesPage expenseService={expenseService} />
                        }
                    />
                )}
            />
            <Route
                path="/metrics"
                component={() => (
                    <Skeleton
                        mediaSize={mediaSize || MediaSizes.xs}
                        content={<MetricsPage />}
                    />
                )}
            />
            <Route
                path="/"
                component={() => (
                    <Skeleton
                        mediaSize={mediaSize || MediaSizes.xs}
                        content={
                            <AddExpensePage
                                categoryService={categoryService}
                                expenseService={expenseService}
                            />
                        }
                    />
                )}
            />
        </Switch>
    </BrowserRouter>
);

export default Router;
