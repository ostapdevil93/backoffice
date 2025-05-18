import {defineStore} from 'pinia';
import {RequestType} from "@/stores/types/backofficeType/RequestType";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {RequestsApi} from "@/api/Requests/RequestsApi";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const useRequestStore = defineStore('RequestStore', {
    state: () =>
        <RequestType>{
            count: 0,
            titles: [
                {text: 'ДЕТАЛИ', value: 'details'},
                {text: 'ID', value: 'id', filterable: true, label: 'ID'},
                {text: 'Клиент', value: 'user_full_name', filterable: true, label: 'Клиент'},
                {text: 'Телефон', value: 'phone', filterable: true, label: 'Телефон'},
                {text: 'Услуга', value: 'service_name', filterable: true, label: 'Услуга'},
                {
                    text: 'Пакет',
                    value: 'package_name',
                    selectable: true,
                    options: [],
                    label: 'Пакет'
                },
                {
                    text: 'Исполнитель',
                    value: 'assigned_employee',
                    selectable: true,
                    options: [],
                    label: 'Исполнитель'
                },
                {
                    text: 'Статус запроса',
                    value: 'status',
                    selectable: true,
                    options: [],
                    label: 'Статус запроса'
                },
                {
                    text: 'Запрос создан',
                    value: 'dt_created',
                    filterable: true,
                    isDate: true,
                    label: 'MM/DD/YYYY'
                },
                {text: 'Действие', value: 'actions', filterable: false, label: 'actions'}
            ],
            requests: [],
            statuses: []
        },

    getters: {},
    actions: {
        getRequests: async function (query: string) {
            const errorStore = useErrorStore();
            errorStore.clearErrors();
            const generalStore = useGeneralSettings();
            try {
                generalStore.loader = true;
                const response = await RequestsApi.getRequests(query);
                this.count = response.count || 0;
                this.requests = response.results || [];
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalStore.loader = false;
            }
        },

        getStatuses: async function () {
            const errorStore = useErrorStore();
            errorStore.clearErrors();
            try {
                this.statuses = await RequestsApi.getStatuses();
                const status = this.titles.find(item => item.value === 'status');
                if (status) {
                    status.options = this.statuses.map(elem => ({
                        value: elem.alias,
                        title: elem.name
                    }));
                }
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            }
        },

        async getPreOrder(query: string) {
            const errorStore = useErrorStore();
            const generalStore = useGeneralSettings();
            errorStore.clearErrors();
            try {
                generalStore.loader = true;
                const response = await RequestsApi.getPreOrder(query);
                this.count = response.count;
                this.requests = response.results;
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка при получении предзаказов');
            } finally {
                generalStore.loader = false;
            }
        }
    }
});
