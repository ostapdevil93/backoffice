import {defineStore} from "pinia";
import {StatisticType} from "@/stores/types/backofficeType/StatisticType";
import {StatisticsApi} from "@/api/Statistics/StatisticsApi";
import {saveAs} from "file-saver";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const useStatisticStore = defineStore('StatisticStore', {
    state: () =>
        <StatisticType>{
            statisticDateRange: {
                start_date: null,
                end_date: null
            }
        },

    getters: {},
    actions: {
        convertBase64ToExcel(file: string) {
            // Проверка, закодированы ли данные в Base64
            const byteCharacters = atob(file);  // Декодируем Base64
            // Преобразование в бинарные данные
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            // Создаем Blob и сохраняем файл
            const blob = new Blob([byteArray], {type: ''});
            saveAs(blob, 'statistics.xlsx');
        },

        downloadCsvFromString(csvContent: string, filename: string): void {
            // Создаем Blob из строки CSV
            const blob = new Blob([csvContent], {type: "text/csv;charset=utf-8;"});

            // Создаем временный URL для Blob
            const url = URL.createObjectURL(blob);

            // Создаем элемент <a> для инициирования скачивания
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;
            link.style.display = "none";

            // Добавляем ссылку на страницу и автоматически "кликаем" по ней
            document.body.appendChild(link);
            link.click();

            // Удаляем временный элемент и освобождаем URL
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        },

        async getStatistics() {
            try {
                const response = await StatisticsApi.getStatistics(this.$state);
                this.convertBase64ToExcel(response.result)
            } catch (error) {
                console.error("Ошибка при скачивании файла:", error);
            }
        },

        async getActStatistic(query: string) {
            const generalSettings = useGeneralSettings();
            const errorStore = useErrorStore();
            try {
                generalSettings.loader = true;
                const response = await StatisticsApi.getActStatistic(query)
                this.downloadCsvFromString(response.data, "data.csv");
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false;
            }
        },

        async getWorkersGraphic(query: string) {
            const generalSettings = useGeneralSettings();
            const errorStore = useErrorStore();
            try {
                generalSettings.loader = true;
                // Запрос данных через API
                const response = await StatisticsApi.getWorkersGraphic(query);
                // Скачиваем CSV файл
                this.downloadCsvFromString(JSON.stringify(response), "data.csv");
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(
                    null,
                    typedError.response?.data?.detail || "Произошла ошибка при загрузке данных"
                );
            } finally {
                generalSettings.loader = false;
            }
        }
    }
});
