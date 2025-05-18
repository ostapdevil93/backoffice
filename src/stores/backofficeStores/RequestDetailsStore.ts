import {defineStore} from "pinia";
import {RequestDetailsType, ChatUploadedFile} from "@/stores/types/backofficeType/RequestDetailsType";
import {useErrorStore} from "@/stores/backofficeStores/ErrorStore";
import {useGeneralSettings} from "@/stores/projectsStore/GeneralSettings";
import {useRequestStore} from "@/stores/backofficeStores/RequestStore";
import {RequestsApi} from "@/api/Requests/RequestsApi";
import {CustomersApi} from "@/api/Customers/CustomersApi";
import {ReviewsApi} from "@/api/Reviews/ReviewsApi";
import {SendMessageRequest, UploadFileRequest, UserChatMessagesResponse} from "@/api/Requests/models";
import {ErrorResponse} from "@/stores/types/backofficeType/ErrorType";

export const useRequestDetailsStore = defineStore('RequestDetailsStore', {
    state: () => <RequestDetailsType> {
        renderInfo: 'all',
        requestId: 0,
        customerId: 0,
        request: null,
        customer: null,
        reviewData: {
            text: '',
            user_id: 0
        },
        reviews: [],
        status: '',
        currentChat: {} as UserChatMessagesResponse,
        currentChatNewMessage: "",
        chatUploadedFiles: [],
        fileIds: []
    },
    getters: {
        prevStatus: (state) => {
            let prevStatus = '';
            if (state.request) {
                prevStatus = state.request.status.alias
            }
            return prevStatus
        },
    },
    actions: {
        async getRequestDetails() {
            const errorStore = useErrorStore();
            const generalSettings = useGeneralSettings();
            try {
                generalSettings.loader = true;
                this.request = await RequestsApi.getRequests('', this.requestId);
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false
            }

        },
        async getCustomerDetails() {
            const errorStore = useErrorStore();
            const generalSettings = useGeneralSettings();
            try {
                generalSettings.loader = true;
                this.customer = await CustomersApi.getCustomers('', this.customerId);
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false
            }

        },
        async getReviews() {
            const errorStore = useErrorStore();
            const generalSettings = useGeneralSettings();
            try {
                generalSettings.loader = true;
                const response = await ReviewsApi.getReviews(this.customerId);
                this.reviews = response.reviews;
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false
            }
        },
        async sendReview() {
            const errorStore = useErrorStore();
            try {
                await ReviewsApi.sendReview(this.reviewData);
                this.getReviews();
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            }
        },
        async changeStatus() {
            const errorStore = useErrorStore();
            const generalSettings = useGeneralSettings();
            const requestStore = useRequestStore();
            switch (this.status) {
                case 'on_review':
                    this.status = 'succeeded'
                    requestStore.getRequests('page[offset]=0&page[offset]&page[limit]=20');
                    generalSettings.openChat = false;
                    break;
                default:
                    this.status = 'on_review';
                    break;
            }
            try {
                await RequestsApi.changeStatus(this.requestId, this.status);
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            }
        },
        formatDateTime(dateTime: string | null, time: boolean = true): string {
            if (!dateTime) return "";
            const date = new Date(dateTime);
            if (isNaN(date.getTime())) return "";
            const formattedDate = date.toLocaleDateString("ru-RU", {day: "2-digit", month: "2-digit", year: "numeric"});
            const formattedTime = date.toLocaleTimeString("ru-RU", {hour: "2-digit", minute: "2-digit"});
            if (time) {
                return `${formattedDate} ${formattedTime}`;
            } else {
                return `${formattedDate}`;
            }
        },
        async getChatMessages(id: number | undefined) {
            try {
                this.currentChat = await RequestsApi.getChatMessages(id);
            } catch (error) {
                console.log(error);
            }
        },
        async sendMessage(data: SendMessageRequest) {
            const generalSettings = useGeneralSettings();
            const errorStore = useErrorStore();
            try {
                generalSettings.loader = true;
                await RequestsApi.sendMessage(data);
                this.currentChatNewMessage = "";
                this.clearFiles();
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false;
            }
        },
        setChatUploadedFiles(file: ChatUploadedFile) {
            if (this.chatUploadedFiles.length > 0) {
                this.chatUploadedFiles.push(file);
            } else {
                this.chatUploadedFiles[0] = file;
            }
        },
        setFileIds(id: number) {
            this.fileIds.push(id);
        },
        clearFiles() {
            this.chatUploadedFiles = [];
            this.fileIds = [];
        },
        removeUploadedFile(id: number) {
            if (this.chatUploadedFiles.length === 1) {
                this.chatUploadedFiles = [];
            } else {
                this.chatUploadedFiles = [...this.chatUploadedFiles].filter(elem => elem.id !== id);
            }
            if (this.fileIds.length === 1) {
                this.fileIds = [0];
            } else {
                this.fileIds = this.fileIds.filter(elem => elem !== id);
            }
        },
        async uploadFile(data: UploadFileRequest) {
            const generalSettings = useGeneralSettings();
            const errorStore = useErrorStore();
            try {
                generalSettings.loader = true;
                const response = await RequestsApi.uploadFile(data);
                this.setFileIds(response.file_id);
                this.setChatUploadedFiles({
                    name: data.file_name,
                    id: response.file_id
                });
            } catch (error) {
                errorStore.addError(null, 'При отправке файла произошла ошибка!');
            } finally {
                generalSettings.loader = false;
            }
        },
        async sendReviewRequest(id: number | undefined) {
            const generalSettings = useGeneralSettings();
            const errorStore = useErrorStore();
            try {
                generalSettings.loader = true;
                await RequestsApi.sendReviewRequest(id);
            } catch (error) {
                const typedError = error as ErrorResponse;
                errorStore.addError(null, typedError.response?.data?.detail || 'Произошла ошибка');
            } finally {
                generalSettings.loader = false;
            }
        },
    }
});