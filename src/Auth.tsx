import * as React from 'react';

import { startFirebaseAuth } from './firebase';

interface OwnProps {
    setUser: (payload: { user: any }) => void;
}

class Auth extends React.Component<OwnProps, {}> {
    componentDidMount() {
        // add redux
        startFirebaseAuth(this.props.setUser);
    }

    render() {
        return <div id="firebaseui" />;
    }
}

export default Auth;
