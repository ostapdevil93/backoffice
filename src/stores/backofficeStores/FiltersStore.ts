import {defineStore} from "pinia";
import {FiltersType, PageType} from "@/stores/types/backofficeType/FiltersType";

const generateQueryString = (filters: object, page: PageType, pageParam = 'page'): string => {
    const query = [];

    if (page.offset !== undefined) {
        query.push(`${pageParam}[offset]=${encodeURIComponent(page.offset)}`);
    }
    if (page.limit !== undefined) {
        query.push(`${pageParam}[limit]=${encodeURIComponent(page.limit)}`);
    }

    for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== '') {
            const strValue = typeof value !== 'string' ? String(value) : value;
            query.push(`filters${encodeURIComponent(`[${key}]`)}=${encodeURIComponent(strValue)}`);
        }
    }

    return query.join('&');
}

export const useFiltersStore = defineStore('FiltersStore', {
    state: () =>
        <FiltersType>{
            requestsFilters: {
                filters: {
                    id: '',
                    user_full_name: '',
                    phone: '',
                    service_name: '',
                    package_name: '',
                    assigned_employee: '',
                    status: '',
                    dt_created: null,
                },
                page: {
                    offset: 0,
                    limit: 20
                },
            },
            packagesFilters: {
                filters: {
                    order_id: '',
                    certificate_number: null,
                    partner: '',
                    package: '',
                    price: '',
                    phone: '',
                    full_name: '',
                    start_date: '',
                    end_date: '',
                    purchase_date: ''
                },
                page: {
                    offset: 0,
                    limit: 20
                }
            }
        },

    getters: {
        requestsQueryString(state): string {
            return generateQueryString(state.requestsFilters.filters, state.requestsFilters.page, 'page');
        },

        packagesQueryString(state): string {
            return generateQueryString(state.packagesFilters.filters, state.packagesFilters.page, '_page');
        },
    },

    actions: {
        clearAllFilters() {
            this.requestsFilters = {
                filters: {
                    id: '',
                    user_full_name: '',
                    phone: '',
                    service_name: '',
                    package_name: '',
                    assigned_employee: '',
                    status: '',
                    dt_created: null,
                },
                page: {
                    offset: 0,
                    limit: 20
                },
            };
            this.packagesFilters = {
                filters: {
                    order_id: '',
                    certificate_number: null,
                    partner: '',
                    package: '',
                    price: '',
                    phone: '',
                    full_name: '',
                    start_date: '',
                    end_date: '',
                    purchase_date: ''
                },
                page: {
                    offset: 0,
                    limit: 20
                }
            };
        }
    }
});
