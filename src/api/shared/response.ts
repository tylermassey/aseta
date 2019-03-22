enum ResponseTypes {
    Success = 'success',
    Error = 'error',
}

interface SuccessResponse<T> {
    type: ResponseTypes.Success;
    payload: T;
}

interface ErrorResponse<T> {
    type: ResponseTypes.Error;
    message: string;
    payload: T;
}

type Response<T, U> = SuccessResponse<T> | ErrorResponse<U>;

const successResponse = <T>(payload: T): SuccessResponse<T> => ({
    type: ResponseTypes.Success,
    payload,
});

const errorResponse = <T>(message: string, payload: T): ErrorResponse<T> => ({
    type: ResponseTypes.Error,
    message,
    payload,
});

export { ResponseTypes, Response, successResponse, errorResponse };
