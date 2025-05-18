import { PostApiTemplate } from '@/api/ApiTemplate/PostApiTemplate';
import { AuthData } from "@/stores/types/backofficeType/AuthType";
import { AuthApiResponse, ResetPasswordApi } from "@/api/Auth/models";

export class AuthApi extends PostApiTemplate {
    static async sendLogin(authData: AuthData): Promise<AuthApiResponse> {
        return this.post<AuthApiResponse, AuthData>('auth/login', authData);
    }

    static async resetPassword(email: string): Promise<ResetPasswordApi> {
        return this.post<ResetPasswordApi, { email: string }>('auth/reset_password', { email });
    }
}
