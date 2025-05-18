import {BaseApi} from '@/api/BaseApi';


export abstract class PostApiTemplate extends BaseApi {
    /**
     * Универсальный метод для POST-запросов
     * @param endpoint - конечная точка API, например, 'auth/login'
     * @param data - данные для отправки в теле запроса
     * @param useAuth - флаг, указывающий, требуется ли токен аутентификации
     * @param baseUrl - базовый URL для запроса
     */

    static async post<T, D>(endpoint: string, data: D, useAuth = false, baseUrl: string = '/api/backoffice/v1'): Promise<T> {

        const url = `${baseUrl}/${endpoint}`;
        const token = localStorage.getItem("token");

        const headers = useAuth
            ? {Authorization: `Token ${token}`}
            : {};

        if (data) {
            return this.doRequest({
                method: 'POST',
                url,
                data,
                headers,
            });
        } else {
            return this.doRequest({
                method: 'POST',
                url,
                headers,
            });
        }
    }
}