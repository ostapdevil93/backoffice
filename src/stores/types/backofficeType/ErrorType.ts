export interface ErrorType {
    field?: string | null;
    message: string;
}

export interface ErrorStoreState {
    errors: ErrorType[];
    successMessage: string | null;
}

export interface ErrorResponse {
    response: {
        data: {
            detail: string,
            email: string[]
        }
    }
}