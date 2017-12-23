export interface LoginResponse {
    result?: {
        email?: string;
        uid?: string; // userId
    };
    error?: {
        code?: string;
        message?: string;
    };
}
