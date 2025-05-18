import {defineStore} from "pinia";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {useRequestStore} from "@/stores/backofficeStores/RequestStore";
import {PackageData} from "@/stores/types/backofficeType/PackageType";
import {PackagesApi} from "@/api/Packages/PackagesApi";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {RequestTitleType} from "@/stores/types/backofficeType/RequestType";
import {PackagesResponse} from "@/api/Packages/models";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const usePackageStore = defineStore('PackageStore', {
    state: () =>
        <PackageData>{
            packages: [],
            canceledPackages: {
                total: 0,
                data: [],
            },
            canceledPackagesTitles: [
                {
                    text: 'Order ID',
                    value: 'id',
                    filterable: true,
                    label: 'Order ID'
                },
                {
                    text: 'Сертификат-номер ',
                    value: 'certificate_number',
                    filterable: true,
                    label: 'Сертификат-номерСертификат-номер'
                },
                {
                    text: 'Партнёр',
                    value: 'partner',
                    selectable: true,
                    options: [],
                    label: 'Партнёр'
                },
                {
                    text: 'Пакет',
                    value: 'package',
                    selectable: true,
                    options: [],
                    label: 'Пакет'
                },
                {
                    text: 'Стоимость',
                    value: 'price',
                    filterable: true,
                    label: 'Стоимость'
                },
                {
                    text: 'Телефон',
                    value: 'phone',
                    filterable: true,
                    label: 'Телефон'
                },
                {
                    text: 'Персональные данные',
                    value: 'customer_full_name',
                    filterable: true,
                    label: 'Персональные данные'
                },
                {
                    text: 'Дата начала действия',
                    value: 'start_date',
                    filterable: true,
                    isDate: true,
                    label: 'MM/DD/YYYY'
                },
                {
                    text: 'Дата окончания действия',
                    value: 'end_date',
                    filterable: true,
                    isDate: true,
                    label: 'MM/DD/YYYY'
                },
                {
                    text: 'Дата возврата',
                    value: 'purchase_date',
                    filterable: true,
                    isDate: true,
                    label: 'MM/DD/YYYY'
                },
                {
                    text: 'Действие',
                    value: 'actions',
                    filterable: false,
                    label: 'actions'
                }
            ],
            clientData: null
        },
    getters: {},
    actions: {
        async getPackages(page: 'requests' | 'packages') {
            const errorStore = useErrorStore();
            //const generalStore = useGeneralSettings();

            // Очистка ошибок
            errorStore.clearErrors();

            try {
                const packages = await PackagesApi.getPackages();

                // Общий метод для обновления options
                const updateOptions = (titles: RequestTitleType[], valueKey: string) => {
                    const field = titles.find(item => item.value === valueKey);
                    if (field) {
                        field.options = packages.map((pkg: PackagesResponse) => ({
                            value: pkg.alias,
                            title: pkg.verbose_name
                        }));
                    }
                };

                switch (page) {
                    case 'requests':
                        const requestsStore = useRequestStore();
                        updateOptions(requestsStore.titles, 'package_name');
                        break;

                    case 'packages':
                        updateOptions(this.canceledPackagesTitles, 'package');
                        break;
                }
            } catch (error) {
                const typedError = error as ErrorResponse;
                const errorMessage = typedError.response?.data?.detail || 'Произошла ошибка';
                errorStore.addError(null, errorMessage);
            }
        },

        async getCanceledPackages(query: string) {
            const errorStore = useErrorStore();
            const generalSetting = useGeneralSettings();
            errorStore.clearErrors();
            try {
                generalSetting.loader = true;
                this.canceledPackages = await PackagesApi.getCanceledPackages(query);

            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSetting.loader = false;
            }
        }
    }
});
