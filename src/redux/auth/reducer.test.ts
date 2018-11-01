import { AuthActionTypes } from './actions';
import authReducer, { initialState } from './reducer';

describe('auth reducer', () => {
    describe(AuthActionTypes.SET_USER, () => {
        test('sets user', () => {
            const newState = authReducer(initialState, {
                type: AuthActionTypes.SET_USER,
                payload: { user: { name: 'test' } },
            });
            expect(newState).toEqual({
                ...initialState,
                user: { name: 'test' },
            });
        });
    });
});
