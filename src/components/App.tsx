import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CategoryService from '../api/categories/service';
import ExpenseService from '../api/expenses/service';
import { Action, setUser, SetUserPayload } from '../redux/auth/actions';
import ReduxState from '../redux/state';
import Auth from './Auth';
import Router from './Router';

import MediaWatcher from './MediaWatcher';

interface OwnProps {
    categoryService: CategoryService;
    expenseService: ExpenseService;
}

interface ReduxStateProps {
    user: any;
}

interface ReduxDispatchProps {
    setUser: Action<SetUserPayload>;
}

type AllProps = OwnProps & ReduxStateProps & ReduxDispatchProps;

class App extends React.Component<AllProps, {}> {
    render() {
        return this.props.user ? (
            <MediaWatcher>
                <Router
                    categoryService={this.props.categoryService}
                    expenseService={this.props.expenseService}
                />
            </MediaWatcher>
        ) : (
            <Auth setUser={this.props.setUser} />
        );
    }
}

const mapStateToProps = (state: ReduxState) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch: any): ReduxDispatchProps => ({
    setUser: bindActionCreators(setUser, dispatch),
});

export default connect<ReduxStateProps, ReduxDispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
)(App);
