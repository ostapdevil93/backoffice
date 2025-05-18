import { GetApiTemplate } from "@/api/ApiTemplate/GetApiTemplate";
import { CustomerApiResponse } from "@/api/Customers/models/CustomersResponse";

export class CustomersApi extends GetApiTemplate {
    /**
     * Универсальный метод для получения списка клиентов или конкретного клиента по ID
     * @param customersData - строка параметров запроса, например, 'status=active'
     * @param customerId - идентификатор клиента, если запрос нужен для конкретного клиента
     */
    static async getCustomers(customersData: string, customerId: number | undefined = 0): Promise<CustomerApiResponse> {
        return this.get<CustomerApiResponse>(`customer${customerId > 0 ? '/' + customerId : ''}`, customersData);
    }
}
