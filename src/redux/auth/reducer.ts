import { Reducer } from 'redux';

import {
    ActionResponse,
    AuthAction,
    AuthActionTypes,
    SetUserPayload,
} from './actions';

interface AuthState {
    user: any;
}

const initialState = {
    user: undefined,
};

const authReducer: Reducer<AuthState> = (
    state: AuthState = initialState,
    action: AuthAction
): AuthState => {
    switch (action.type) {
        case AuthActionTypes.SET_USER:
            return setUser(state, action);
        default:
            return state;
    }
};

const setUser = (
    state: AuthState,
    action: ActionResponse<SetUserPayload>
): AuthState => ({
    ...state,
    user: action.payload.user,
});

export { AuthState, initialState };
export default authReducer;
