import {defineStore} from "pinia";
import {ErrorStoreState} from "@/stores/types/backofficeType/ErrorType";


export const useErrorStore = defineStore('errorStore', {
    state: () => <ErrorStoreState>{
        errors: [],
        successMessage: null
    },
    actions: {
        addError(field: string | null, message: string | string[]) {
            const errorMessage = Array.isArray(message) ? message.join(', ') : message;
            this.errors.push({field: field, message: errorMessage});
            if (errorMessage === 'Недопустимый токен.') {
                localStorage.removeItem('token');
            }
        },

        clearErrors() {
            this.errors = [];
        },

        setSuccessMessage(message: string) {
            this.successMessage = message;
        },

        clearSuccessMessage() {
            this.successMessage = null;
        },
    }
});
