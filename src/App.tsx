import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import Auth from './Auth';
import { Action, setUser, SetUserPayload } from './redux/auth/actions';
import ReduxState from './redux/state';

interface ReduxStateProps {
    user: any;
}

interface ReduxDispatchProps {
    setUser: Action<SetUserPayload>;
}

type AllProps = ReduxStateProps & ReduxDispatchProps;

class App extends React.Component<AllProps, {}> {
    render() {
        return (
            <div className="test">
                {this.props.user ? (
                    <div className="App">ASETA</div>
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

export default connect<ReduxStateProps, ReduxDispatchProps, {}>(
    mapStateToProps,
    mapDispatchToProps
)(App);
