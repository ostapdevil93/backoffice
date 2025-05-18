export interface AuthData {
    email: string;
    password: string;
}

export interface AuthStore {
    authData: AuthData;
    isRegistered: boolean;

    isLogin: boolean;
    isRegister: boolean;
    isForgotPassword: boolean;

    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    toggleRememberUser: () => void;

    showLogin: () => void;
    showRegister: () => void;
    showForgotPassword: () => void;
    token: string;
}
