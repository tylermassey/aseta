enum AuthActionTypes {
    SET_USER = 'app/setUser',
}

interface ActionResponse<T> {
    type: string;
    payload: T;
}

type Action<T> = (payload: T) => ActionResponse<T>;

interface SetUserPayload {
    user: any;
}

const setUser: Action<SetUserPayload> = payload => ({
    type: AuthActionTypes.SET_USER,
    payload,
});

type AuthAction = ActionResponse<SetUserPayload>;

export {
    AuthAction,
    AuthActionTypes,
    Action,
    ActionResponse,
    SetUserPayload,
    setUser,
};
