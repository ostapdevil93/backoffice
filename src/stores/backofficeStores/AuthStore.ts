// AuthStore.ts

import {defineStore} from 'pinia';
import {AuthStore} from "@/stores/types/backofficeType/AuthType";
import {AuthApi} from "@/api/Auth/AuthApi";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";


export const useAuthStore = defineStore('Auth', {
    state: () => <AuthStore>({
        authData: {
            email: '',
            password: '',
        },
        isRegistered: localStorage.getItem('token') !== null,
        isLogin: true,
        isRegister: false,
        isForgotPassword: false,
        token: localStorage.getItem('token') === null ? '' : localStorage.getItem('token')
    }),

    actions: {
        async login() {
            const errorStore = useErrorStore();
            errorStore.clearErrors();
            if (!this.authData.email || !this.authData.password) {
                errorStore.addError(null, "Заполните email и пароль.");
                return;
            }
            const generalStore = useGeneralSettings();
            try {
                generalStore.loader = true;
                const response = await AuthApi.sendLogin(this.authData);
                if (response.token) {
                    localStorage.setItem('token', response.token);
                    this.token = response.token;
                    errorStore.setSuccessMessage("Вы успешно вошли в систему.");
                    this.isRegistered = true;
                }
            } catch (error) {
                const typedError = error as ErrorResponse;
                if (typedError.response && typedError.response.data) {
                    if (typedError.response.data.email) {
                        errorStore.addError('email', typedError.response.data.email[0]);
                    } else if (typedError.response.data.detail) {
                        errorStore.addError(null, typedError.response.data.detail);
                    }
                } else {
                    errorStore.addError(null, "Произошла ошибка входа.");
                }
            } finally {
                generalStore.loader = false;
            }
        },

        async register(email: string, password: string) {
            if (this.authData.email !== '' && this.authData.password !== '') {
                this.authData.email = email;
                this.authData.password = password;
                this.isRegistered = true;
            }
        },

        async resetPassword() {
            const errorStore = useErrorStore();
            errorStore.clearErrors();
            if (this.authData.email !== '' && this.isForgotPassword) {
                const generalStore = useGeneralSettings();
                try {
                    generalStore.loader = true;
                    const response = await AuthApi.resetPassword(this.authData.email);
                    errorStore.setSuccessMessage(response.detail);
                } catch (error) {
                    const typedError = error as ErrorResponse;
                    errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
                } finally {
                    generalStore.loader = false;
                }
            }
        },

        clearLocalStorage() {
            console.log("Очистка localStorage");
            localStorage.removeItem('token');
        },

        showLogin() {
            this.isLogin = true;
            this.isRegister = false;
            this.isForgotPassword = false;
        },
        showRegister() {
            this.isLogin = false;
            this.isRegister = true;
            this.isForgotPassword = false;
        },
        showForgotPassword() {
            this.isLogin = false;
            this.isRegister = false;
            this.isForgotPassword = true;
        }
    }
});
