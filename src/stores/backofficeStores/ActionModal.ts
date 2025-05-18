import {defineStore} from "pinia";
import {ActionModalType} from "@/stores/types/backofficeType/ActionModalType";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";
import {RequestsApi} from "@/api/Requests/RequestsApi";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";

export const useActionModalStore = defineStore('ActionModalStore', {
    state: () =>
        <ActionModalType>{
            userId: 0,
            termId: ''
        },
    getters: {},
    actions: {
        async putAssigmentEmployers() {
            const errorStore = useErrorStore();
            try {
                await RequestsApi.putAssigmentEmployer(this.userId, {termId: this.termId});
                errorStore.setSuccessMessage('Специалист успешно назначен');
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            }
        }
    }
});