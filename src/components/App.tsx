import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ExpenseService from '../api/expenses/service';
import { Action, setUser, SetUserPayload } from '../redux/auth/actions';
import ReduxState from '../redux/state';
import Auth from './Auth';
import ExpensePage from './ExpensePage';

import './App.css';

interface OwnProps {
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
        return (
            <div className="test">
                {this.props.user ? (
                    <ExpensePage expenseService={this.props.expenseService} />
                ) : (
                    <Auth setUser={this.props.setUser} />
                )}
            </div>
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
