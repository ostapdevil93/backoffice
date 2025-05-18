import {BaseApi} from '@/api/BaseApi';

export abstract class GetApiTemplate extends BaseApi {
    /**
     * Универсальный метод для GET-запросов
     * @param endpoint - конечная точка API, например, 'customer'
     * @param params - строка параметров запроса, например, 'status=active'
     * @returns Обещание с типом данных T, представляющим возвращаемые данные
     */
    static async get<T>(endpoint: string, params: string = '', baseUrl: string = '/api/backoffice/v1'): Promise<T> {
        const url = `${baseUrl}/${endpoint}${params ? '?' + params : ''}`;
        const token = localStorage.getItem("token");

        return this.doRequest({
            method: 'GET',
            url,
            headers: {
                Authorization: `Token ${token}`,
            },
        });
    }
}
