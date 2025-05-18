import {GetApiTemplate} from "@/api/ApiTemplate/GetApiTemplate";
import {PartnersResponse} from "@/api/Partners/models";

export class PartnersApi extends GetApiTemplate {
    /**
     * Получение списка партнеров
     * @returns Объект Promise, содержащий данные о партнерах (PartnersResponse)
     */
    static async getPartners(): Promise<PartnersResponse[]> {
        return this.get<PartnersResponse[]>('partners')
    }
}
