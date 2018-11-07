enum ResponseType {
    Success = 'success',
    Error = 'error',
}

interface SuccessResponse<T> {
    type: ResponseType.Success;
    payload: T;
}

interface ErrorResponse<T> {
    type: ResponseType.Error;
    message: string;
    payload: T;
}

type Response<T, U> = SuccessResponse<T> | ErrorResponse<U>;

const successResponse = <T>(payload: T): SuccessResponse<T> => ({
    type: ResponseType.Success,
    payload,
});

const errorResponse = <T>(message: string, payload: T): ErrorResponse<T> => ({
    type: ResponseType.Error,
    message,
    payload,
});

export { ResponseType, Response, successResponse, errorResponse };
