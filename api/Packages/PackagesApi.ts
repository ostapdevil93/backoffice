import {GetApiTemplate} from "@/api/ApiTemplate/GetApiTemplate";
import {PackagesResponse, CanceledPackagesResponse} from "@/api/Packages/models";

export class PackagesApi extends GetApiTemplate {
    /**
     * Получение списка пакетов
     * @returns Объект Promise, содержащий данные о пакетах (PackagesResponse)
     */
    static async getPackages(): Promise<PackagesResponse[]> {
        return this.get<PackagesResponse[]>('packages');
    }
    /**
     * Получение списка отмененных пакетов
     * @returns Объект Promise, содержащий данные о пакетах (PackagesResponse)
     */
    static async getCanceledPackages(queryParams: string): Promise<CanceledPackagesResponse> {
        return this.get<CanceledPackagesResponse>('purchases/refunds/ru?', `${queryParams}`)
    }
}



