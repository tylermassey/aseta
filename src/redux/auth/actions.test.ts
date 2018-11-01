import { AuthActionTypes, setUser } from './actions';

describe('auth actions', () => {
    let user: any;

    beforeEach(() => {
        user = { name: 'test' };
    });

    describe('setUser', () => {
        test(`returns type of ${AuthActionTypes.SET_USER}`, () => {
            const action = setUser({ user });
            expect(action.type).toEqual(AuthActionTypes.SET_USER);
        });

        test('returns user', () => {
            const action = setUser({ user });
            expect(action.payload.user).toEqual(user);
        });
    });
});
