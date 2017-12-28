export interface LoginResponse {
    success?: {
        email: string;
        uid: string;
    };
    error?: {
        code: string;
        message: string;
    };
}
