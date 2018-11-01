import * as firebase from 'firebase/app';
import * as ui from 'firebaseui';

import { Firebase as FirebaseConfig } from './env/Config';

const initFirebase = (config: FirebaseConfig) => firebase.initializeApp(config);

const startFirebaseAuth = (
    successCallback: (payload: { user: any }) => void
) => {
    new ui.auth.AuthUI(firebase.auth()).start('#firebaseui', {
        signInOptions: [
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false,
            },
        ],
        callbacks: {
            signInSuccessWithAuthResult: (authResult, _) => {
                successCallback({ user: authResult.user });
                return false;
            },
            signInFailure: () => {
                return Promise.resolve();
            },
        },
    });
};

export { initFirebase, startFirebaseAuth };
