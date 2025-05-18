import {defineStore} from "pinia";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {UploadFileApi} from "@/api/UploadFile/UploadFileApi";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const useUploadStore = defineStore('UploadStore', {
    actions: {
        async convertFileToBase64(file: File): Promise<string> {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    const result = reader.result as string;
                    resolve(result.split(',')[1]);
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsDataURL(file);
            });
        },
        async sendFile(file: File, parentId: number | string) {
            const generalSettings = useGeneralSettings();
            const errorStore = useErrorStore();

            try {
                generalSettings.loader = true;
                const FileBase64 = await this.convertFileToBase64(file);
                const response = await UploadFileApi.sendFile(FileBase64, parentId);
                if (response.detail.errors.length === 0) {
                    errorStore.setSuccessMessage('Реестор успешно добавлен')
                } else {
                    response.detail.errors.forEach((elem: string) => {
                        errorStore.addError(null, elem)
                    })
                }
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false;

            }
        }
    }
})
