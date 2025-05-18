import {defineStore} from "pinia";
import {PartnersType} from "@/stores/types/backofficeType/PartnersType";
import {PartnersApi} from "@/api/Partners/PartnersApi";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {usePackageStore} from "@/stores/backofficeStores/PackageStore";
import {RequestTitleType} from "@/stores/types/backofficeType/RequestType";
import {PartnersResponse} from "@/api/Partners/models";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const usePartnersStore = defineStore('PartnersStore', {
    state: () =>
        <PartnersType>{
            partners: [],
        },
    getters: {
        partnersOptions(state) {
            if (state.partners.length > 0) {
                return state.partners.map((partner: PartnersResponse) => ({
                    value: partner.id,
                    title: partner.name
                }))
            } else return [];
        }
    },
    actions: {
        async getPartners() {
            const errorStore = useErrorStore();
            const packagesStore = usePackageStore();

            // Очистка ошибок
            errorStore.clearErrors();

            try {
                this.partners = await PartnersApi.getPartners();
                const updateOptions = (titles: RequestTitleType[], valueKey: string) => {
                    const field = titles.find(item => item.value === valueKey);
                    if (field) {
                        field.options = this.partners.map((pkg: PartnersResponse) => ({
                            value: pkg.name,
                            title: pkg.name,
                        }));
                    }
                }
                updateOptions(packagesStore.canceledPackagesTitles, 'partner');
            } catch (error) {
                const typedError = error as ErrorResponse;
                const errorMessage = typedError.response?.data?.detail || 'Произошла ошибка';
                errorStore.addError(null, errorMessage);
            }
        }
    }
});
