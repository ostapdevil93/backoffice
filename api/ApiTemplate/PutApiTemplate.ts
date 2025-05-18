import {BaseApi} from '@/api/BaseApi';

export abstract class PutApiTemplate extends BaseApi {
    static async put<T, D>(endpoint: string, data: D, useAuth = true, baseUrl: string = '/api/backoffice/v1'): Promise<T> {
        const url = `${baseUrl}/${endpoint}`;
        const token = localStorage.getItem("token");

        const headers = useAuth
            ? {Authorization: `Token ${token}`}
            : {};

        return this.doRequest({
            method: 'PUT',
            url,
            data,
            headers,
        });
    }
}

