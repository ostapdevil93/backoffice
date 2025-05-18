import {defineStore} from "pinia";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {CustomerData} from "@/stores/types/backofficeType/CustomerType";
import {CustomersApi} from "@/api/Customers/CustomersApi";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {useRequestStore} from "@/stores/backofficeStores/RequestStore";
import {RequestTitleType} from "@/stores/types/backofficeType/RequestType";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const useCustomerStore = defineStore('CustomerStore', {
    state: () =>
        <CustomerData>{
            count: 1,
            titles: [
                {text: 'ДЕТАЛИ', value: 'details'},
                {text: 'ID', value: 'id', filterable: true, label: 'ID'},
                {text: 'ФИО', value: 'full_name', filterable: true, label: 'Клиент'},
                {text: 'Телефон', value: 'phone', filterable: true, label: 'Телефон'},
                {text: 'Код Сертификата', value: 'certificate_code', filterable: true, label: 'Код сертификата'},
                {text: 'Колличество пакетов', value: 'package_count', filterable: true, label: 'Колличество пакетов'},
                {text: 'Дата регистрации', value: 'dt_registered', filterable: true, isDate: true, label: 'MM/DD/YYYY'},
                {text: 'Действие', value: 'actions', label: 'actions'}
            ],
            customers: []
        },

    getters: {},
    actions: {
        async getCustomers(query: string, page: string) {
            const errorStore = useErrorStore();
            errorStore.clearErrors();
            switch (page) {
                case "requests":
                    const requestsStore = useRequestStore();
                    try {
                        const response = await CustomersApi.getCustomers(query);
                        this.customers = response.results;
                        const assignedEmployeeField = requestsStore.titles.find((item: RequestTitleType) => item.value === 'assigned_employee');
                        if (assignedEmployeeField) {
                            assignedEmployeeField.options = this.customers.map(elem => ({
                                value: elem.id,
                                title: elem.full_name
                            }));
                        }
                    } catch (error) {
                        const typedError = error as ErrorResponse;
                        errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
                    } finally {
                    }
                    break;
                case 'customers':
                    const generalStore = useGeneralSettings();
                    try {
                        generalStore.loader = true;
                        const response = await CustomersApi.getCustomers(query);
                        this.customers = response.results;
                        this.count = response.count;
                    } catch (error) {
                        const typedError = error as ErrorResponse;
                        errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
                    } finally {
                        generalStore.loader = false;
                    }
                    break;
            }

        }
    }
});
